from django.urls import path
from core.feedback.views import FeedbackAPIView, UpdateFeedback


urlpatterns = [
    path('feedback/', FeedbackAPIView.as_view(), name="feedback"),
    path('feedback/<int:pk>/', UpdateFeedback.as_view(), name="feedback-update"),
]