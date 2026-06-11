from django.urls import path
from core.feedback.views import FeedbackAPIView


urlpatterns = [
    path('feedback/', FeedbackAPIView.as_view(), name="feedback")
]