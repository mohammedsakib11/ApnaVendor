from django.db import models
from django.contrib.auth.models import User


class Vendor(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="vendor_profile"
    )
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=150)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    price_range = models.CharField(max_length=100, blank=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name