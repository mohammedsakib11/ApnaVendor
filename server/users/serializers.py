from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        
        from django.contrib.auth.models import User

        email = attrs.get("username")

        user = User.objects.filter(email=email).first()

        if user:
            attrs["username"] = user.username

        return super().validate(attrs)

class ProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="profile.phone", allow_blank=True)
    city = serializers.CharField(source="profile.city", allow_blank=True)
    address = serializers.CharField(source="profile.address", allow_blank=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "city",
            "address",
        ]
        read_only_fields = ["id", "username"]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})

        instance.first_name = validated_data.get(
            "first_name", instance.first_name
        )
        instance.last_name = validated_data.get(
            "last_name", instance.last_name
        )
        instance.email = validated_data.get(
            "email", instance.email
        )
        instance.save()

        profile, _ = UserProfile.objects.get_or_create(user=instance)

        for field in ["phone", "city", "address"]:
            if field in profile_data:
                setattr(profile, field, profile_data[field])

        profile.save()

        return instance