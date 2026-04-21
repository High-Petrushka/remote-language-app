from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.authtoken.models import Token

from core.user.serializers import MyUserSerializer


class RegistrationView(APIView):
    serializer_class = MyUserSerializer
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        Token.objects.create(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

