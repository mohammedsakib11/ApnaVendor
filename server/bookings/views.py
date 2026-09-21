from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
import razorpay
from django.conf import settings

from .models import Booking
from .serializers import (
    BookingSerializer,
    PaymentSerializer,
)


class CreateBookingView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user
        ).order_by("created_at")


class BookingDetailView(generics.RetrieveAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user
        )


class CancelBookingView(generics.UpdateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user
        )

    def perform_update(self, serializer):
        booking = self.get_object()

        if booking.status in ["Completed","Cancelled"]:
            raise ValidationError(
                f"Booking with status '{booking.status}' cannot be cancelled."
            )
        
        serializer.save(status="Cancelled")


class UpdateBookingStatusView(generics.UpdateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            vendor__user=self.request.user
        )

    def perform_update(self, serializer):
        booking = self.get_object()
        new_status = self.request.data.get("status")

        allowed_transitions = {
            "Pending": ["Accepted", "Cancelled"],
            "Accepted": ["Completed", "Cancelled"],
            "Completed": [],
            "Cancelled": [],
        }

        if new_status not in allowed_transitions.get(booking.status, []):
            raise ValidationError(
                f"Cannot change booking status from "
                f"{booking.status} to {new_status}."
            )

        serializer.save(status=new_status)
        

class CreateOrderView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        booking_id = request.data.get("booking_id")

        try:
            booking = Booking.objects.get(
                id=booking_id,
                user=request.user
            )
        except Booking.DoesNotExist:
            return Response(
                {"error": "Booking not found."},
                status=404
            )

        if booking.payment_status == "Paid":
            return Response(
                {"error": "Booking is already paid."},
                status=400
            )

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        order = client.order.create({
            "amount": int(booking.amount * 100),
            "currency": "INR",
            "receipt": f"booking_{booking.id}",
        })

        return Response({
            "key_id": settings.RAZORPAY_KEY_ID,
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
        })


class VerifyPaymentView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        booking_id = request.data.get("booking_id")
        payment_id = request.data.get("razorpay_payment_id")
        order_id = request.data.get("razorpay_order_id")
        signature = request.data.get("razorpay_signature")

        try:
            booking = Booking.objects.get(
                id=booking_id,
                user=request.user
            )
        except Booking.DoesNotExist:
            return Response(
                {"error": "Booking not found."},
                status=404
            )

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        try:
            client.utility.verify_payment_signature({
                "razorpay_payment_id": payment_id,
                "razorpay_order_id": order_id,
                "razorpay_signature": signature,
            })
        except razorpay.errors.SignatureVerificationError:
            return Response(
                {"error": "Payment verification failed."},
                status=400
            )

        booking.payment_status = "Paid"
        booking.payment_id = payment_id
        booking.save()

        return Response({
            "message": "Payment verified successfully.",
            "payment_status": booking.payment_status,
        })


class UpdatePaymentStatusView(generics.UpdateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(
            user=self.request.user
        )

    def perform_update(self, serializer):
        booking = self.get_object()

        booking.payment_status = serializer.validated_data["payment_status"]
        booking.payment_id = serializer.validated_data.get("payment_id")
        booking.save()

