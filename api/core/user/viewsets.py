#from rest_framework.viewsets import ViewSet
    # rest_framework.response import Response
    # rest_framework import status
 #from django.shortcuts import get_object_or_404
 #from core.user.models import MyUser
    # core.user.serializers import MyUserSerializer
 #
    #s MyUserViewSet(ViewSet):
    #queryset = MyUser.objects.all()
    #serializer_class = MyUserSerializer
 #    def list(self, request):
    #    users  =  self.queryset
    #    serializer = self.serializer_class(users, many=True)
    #    return Response(serializer.data)
 #    def create(self, request):
    #    serializer = self.serializer_class(data=request.data)
    #    serializer.is_valid(raise_exception=True)
    #    serializer.save()
    #    return Response(serializer.data, status=status.HTTP_201_CREATED)
 #    def retrieve(self, request, pk=None):
    #    user = get_object_or_404(self.queryset, pk=pk)
    #    serializer = self.serializer_class(user)
    #    return Response(serializer.data)