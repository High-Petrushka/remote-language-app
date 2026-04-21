from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from core.serializers import ApiRootSerializer
from core.user.models import MyUser
from core.lesson.models import Lesson
from core.lesson.serializers import LessonListSerializer


@api_view(["GET"])
def api_root(request, format=None):
    lessons = Lesson.objects.order_by("-pk")[:3]
    resent_lessons = LessonListSerializer(lessons, many=True, context={"request": request})

    response_dict = {
        "users": reverse("users", request=request, format=format),
        "lessons": reverse("lessons", request=request, format=format),
        "resent_lessons": resent_lessons.data,
    }

    if request.auth is None:
        response_dict["registration"] = reverse("registration", request=request, format=format)
        response_dict["login"] = reverse("auth-token", request=request, format=format)
    else:
        user = MyUser.objects.get(pk=request.user.id)
        serializer = ApiRootSerializer(user, context={"request": request})
        return Response({
            "users": response_dict["users"],
            "lessons": response_dict["lessons"],
            "user_url": serializer.data["user_url"],
            "resent_lessons": resent_lessons.data,
        })

    return Response(response_dict)
