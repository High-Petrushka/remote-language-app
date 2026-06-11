from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from core.serializers import ApiRootSerializer
from core.user.models import MyUser
from core.lesson.models import Lesson
from core.lesson.serializers import LessonListSerializer
from core.user.serializers import MyUserSerializer
from core.feedback.models import Feedback
from core.feedback.serializers import FeedbackSerializer


@api_view(["GET"])
def api_root(request, format=None):
    lessons = Lesson.objects.order_by("-pk")[:6]
    resent_lessons = LessonListSerializer(lessons, many=True, context={"request": request})
    user_feedback = Feedback.objects.filter(selected=True).order_by("-pk")[:3]
    feedback_serializer = FeedbackSerializer(user_feedback, many=True)
    return Response({
        "feed_back":  feedback_serializer.data,
    })
