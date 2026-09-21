from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=False
    )

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = [
            "id",
            "user",
            "amount",
            "payment_status",
            "payment_id"
        ]

    def validate(self, data):
        
        vendor = data.get("vendor")
        service = data.get("service")

        if vendor is not None and service is not None:
            if service.vendor_id != vendor.id:
                raise serializers.ValidationError(
                    "Selected service does not belong to this vendor."
                )

        return data

    def create(self, validated_data):
        service = validated_data["service"]
        validated_data["amount"] = service.price

        return Booking.objects.create(**validated_data)


class PaymentSerializer(serializers.Serializer):
    payment_status = serializers.ChoiceField(
        choices=["Paid", "Failed"]
    )

    payment_id = serializers.CharField(
        required=False,
        allow_blank=True
    )

    def validate(self, data):
        if data["payment_status"] == "Paid" and not data.get("payment_id"):
            raise serializers.ValidationError(
                "Payment ID is required for successful payment."
            )

        return data