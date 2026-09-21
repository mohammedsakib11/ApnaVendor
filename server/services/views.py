from django.shortcuts import render
from rest_framework import generics
from .models import Service
from .serializer import ServiceSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_available=True)
    serializer_class = ServiceSerializer

class ServiceCreateView(generics.CreateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        vendor = serializer.validated_data["vendor"]

        if vendor.user != self.request.user:
            raise PermissionDenied(
                "You can only create services for your own vendor profile."
            )

        serializer.save()

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceUpdateView(generics.UpdateAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(
            vendor__user=self.request.user
        )

class ServiceDeleteView(generics.DestroyAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(
            vendor__user=self.request.user
        )