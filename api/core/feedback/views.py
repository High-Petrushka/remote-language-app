from rest_framework import status
from rest_framework.generics import UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

from core.feedback.models import Feedback
from core.feedback.serializers import FeedbackSerializer

class FeedbackAPIView(APIView):
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        feedback = Feedback.objects.all().order_by("-pk")

        sort_by = request.GET.get("sort_by")
        if sort_by:
            feedback = feedback.order_by(sort_by)

        serializer = self.serializer_class(feedback, context={'request': request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateFeedback(RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        sort_by = self.request.GET.get("sort_by")
        print(sort_by)

        if sort_by:
            return self.queryset.order_by(sort_by)
        return self.queryset