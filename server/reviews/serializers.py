from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ["id", "user", "careate_at","updated_at"]

    def validate_rating(self,value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )

        return value

    def validate(self,data):
        request = self.context["request"]
        booking = data.get("booking")
        vendor = data.get("vendor")

        if booking.user != request.user:
            raise serializers.ValidationError(
                "You can only review your own bookings."
            )

        if booking.status != "Completed":
            raise serializers.ValidationError(
                "You can only review a completed booking."
            )

        if booking.vendor_id != vendor.id:
            raise serializers.ValidationError(
                "Booking and vendor do not match."
            )
        return data