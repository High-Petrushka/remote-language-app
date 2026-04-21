from django.urls import path

from core.auth.views import RegistrationView

urlpatterns = [
    path("registration/", RegistrationView.as_view(), name="registration"),
]