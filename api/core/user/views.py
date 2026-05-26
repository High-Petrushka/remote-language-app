from django.http import Http404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from core.user.models import MyUser
from core.user.serializers import MyUserSerializer, MyUserDetailSerializer
from core.auth.permissions import IsAccountOwner
from core.pagination import CustomPagination


#class MyUserList(APIView, CustomPagination):
#    serializer_class = MyUserSerializer
#    permission_classes = (AllowAny,)
#
#    def get(self, request):
#        user = MyUser.objects.all()
#        if not request.user.is_authenticated or not request.user.is_admin:
#            user = user.exclude(is_admin=True)
#        results = self.paginate_queryset(user, request, view=self)
#        serializer = self.serializer_class(results, many=True, context={"request": request})
#        return Response(serializer.data)


class MyUserList(generics.ListAPIView, CustomPagination):
    queryset = MyUser.objects.exclude(pk=1)
    serializer_class = MyUserSerializer
    permission_classes = (AllowAny,)


class MyUserDetail(APIView):
    serializer_class = MyUserDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsAccountOwner,)

    def get_object(self, pk):
        try:
            obj = MyUser.objects.get(pk=pk)
            self.check_object_permissions(self.request, obj)
            return obj
        except MyUser.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk=pk)
        serializer = self.serializer_class(user, context={"request": request})
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = self.serializer_class(user, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
