from django.urls import path
from core.feedback.views import FeedbackView, FeedbackAPIView


urlpatterns = [
    path('feedback/', FeedbackAPIView.as_view(), name="feedback")
]