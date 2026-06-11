from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from core.feedback.models import Feedback
from core.feedback.serializers import FeedbackSerializer

class FeedbackView(ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class FeedbackAPIView(APIView):
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        feedback = Feedback.objects.all()
        serializer = self.serializer_class(feedback, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
