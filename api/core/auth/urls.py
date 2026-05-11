from django.urls import path

from core.auth.views import RegistrationView, CustomAuthToken

urlpatterns = [
    path("registration/", RegistrationView.as_view(), name="registration"),
    path("login/", CustomAuthToken.as_view(), name="login")
]