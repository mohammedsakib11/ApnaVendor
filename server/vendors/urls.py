from django.urls import path
from .views import VendorListView,VendorCreateView,VendorDetailView,VendorUpdateView,VendorDeleteView

urlpatterns = [
    path("", VendorListView.as_view(), name="vendor-list"),
    path("create/", VendorCreateView.as_view(), name="vendor-create"),
    path("<int:pk>/", VendorDetailView.as_view(), name="vendor-detail"),
    path("<int:pk>/update/", VendorUpdateView.as_view(), name="vendor-update"),
    path("<int:pk>/delete/", VendorDeleteView.as_view(), name="vendor-delete"),
]