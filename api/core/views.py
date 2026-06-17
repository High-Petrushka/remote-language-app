from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.feedback.models import Feedback
from core.feedback.serializers import FeedbackSerializer


@api_view(["GET"])
def api_root(request, format=None):
    user_feedback = Feedback.objects.filter(selected=True).order_by("-pk")[:3]
    feedback_serializer = FeedbackSerializer(user_feedback, many=True, context={"request": request})
    return Response({
        "feed_back":  feedback_serializer.data,
    })
