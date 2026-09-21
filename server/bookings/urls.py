from django.urls import path

from .views import (
    CreateBookingView,
    BookingListView,
    BookingDetailView,
    CancelBookingView,
    UpdateBookingStatusView,
    UpdatePaymentStatusView,
    CreateOrderView,
    VerifyPaymentView,

);



urlpatterns = [
    path("create/", CreateBookingView.as_view(), name="create-booking"),
    path("", BookingListView.as_view(), name="booking-list"),
    path("<int:pk>/", BookingDetailView.as_view(), name="booking-detail"),
    path("<int:pk>/cancel/", CancelBookingView.as_view(), name="cancel-booking"),
    path("<int:pk>/status/", UpdateBookingStatusView.as_view(), name="update-booking-status"),
    path("<int:pk>/payment/", UpdatePaymentStatusView.as_view(), name="update-payment"),
    path("create-order/", CreateOrderView.as_view(), name="create-order"),
    path("verify-payment/", VerifyPaymentView.as_view(), name="verify-payment"),
]