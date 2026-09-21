from rest_framework import serializers
from .models import Vendor
from django.db.models import Avg,Count,Min

class VendorSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    minPrice = serializers.SerializerMethodField()

    class Meta:
        model = Vendor
        fields = [
            "id",
            "name",
            "category",
            "description",
            "location",
            "address",
            "phone",
            "price_range",
            "is_approved",
            "user",
            "rating",
            "reviews",
            "minPrice",
        ]
        read_only_fields = ["id", "user"]

    def get_rating(self, obj):
        rating = obj.reviews.aggregate(avg=Avg("rating"))["avg"]
        return round(rating, 1) if rating else 0

    def get_reviews(self, obj):
        return obj.reviews.count()

    def get_minPrice(self, obj):
        return float(
            obj.services.filter(is_available=True)
            .aggregate(min_price=Min("price"))["min_price"] or 0
        )