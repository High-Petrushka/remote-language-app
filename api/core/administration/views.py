from django.http import Http404

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.decorators import permission_classes, api_view

from core.lesson.models import Language
from core.administration.serializers import LanguageSerializer
from core.user.models import MyUser
from core.user.serializers import MyUserSerializer, MyUserDetailSerializer
from core.administration.serializers import BlockUserSerializer


class AdministrationRootView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request):
        return Response({
            "languages": reverse("language-list", request=request, format=None),
            "users": reverse("administration-user-list", request=request, format=None),
        })


class LanguageList(APIView):
    serializer_class = LanguageSerializer
    permission_classes = (IsAdminUser,)

    def get(self, request):
        languages = Language.objects.all()
        serializer = self.serializer_class(languages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LanguageDetail(APIView):
    serializer_class = LanguageSerializer
    permission_classes = (IsAdminUser,)

    def get_object(self, pk):
        try:
            obj = Language.objects.get(pk=pk)
            return obj
        except Language.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        language = self.get_object(pk=pk)
        serializer = self.serializer_class(language)
        return Response(serializer.data)

    def put(self, request, pk):
        language_obj = self.get_object(pk)
        serializer = self.serializer_class(language_obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        language_obj = self.get_object(pk)
        language_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_users_list(request):
    users = MyUser.objects.all()
    serializer = MyUserSerializer(users, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def block_user(request, pk):
    try:
        user = MyUser.objects.get(pk=pk)
    except (ValueError, TypeError, MyUser.DoesNotExist):
        raise Http404

    serializer = BlockUserSerializer(user, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)
