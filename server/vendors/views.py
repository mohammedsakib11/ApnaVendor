from rest_framework import generics
from .models import Vendor
from .serializers import VendorSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied,ValidationError


class VendorListView(generics.ListAPIView):
    queryset = Vendor.objects.filter(is_approved=True)
    serializer_class = VendorSerializer

class VendorCreateView(generics.CreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if hasattr(self.request.user, "vendor_profile"):
            raise ValidationError(
                "You already have a vendor profile."
             )

        serializer.save(user=self.request.user)

class VendorDetailView(generics.RetrieveAPIView):
    queryset = Vendor.objects.filter(is_approved=True)
    serializer_class = VendorSerializer

    def get_queryset(self):
            return Vendor.objects.filter(
            id=self.kwargs["pk"],
            is_approved=True
        )

class VendorUpdateView(generics.UpdateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Vendor.objects.filter(
            user=self.request.user
            )

class VendorDeleteView(generics.DestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer