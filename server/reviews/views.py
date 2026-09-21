from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Review
from .serializers import ReviewSerializer

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_class = [IsAuthenticated]

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        vendor_id = self.request.query_params.get("vendor")
        if vendor_id:
            return Review.objects.filter(vendor_id=vendor_id)
        return Review.objects.all()

class ReviewDetailView(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewUpdateView(generics.UpdateAPIView):
    serializer_class = ReviewSerializer
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

class ReviewDeleteView(generics.DestroyAPIView):
    permission_class = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)