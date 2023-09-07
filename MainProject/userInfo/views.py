from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from .serializers import RegisterSerializer,UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer


@api_view(['POST'])
def get_user_data(request):
    print(request.data)
    # print(request.data)
    user = request.user
    # print(user)
    if user.is_authenticated:
        return Response({
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    else:
        return Response({
            'error':'not authenticated'
        },status = 400)
# @api_view(['POST'])
# def login_api(request):
#     serializer = AuthTokenSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.validated_data['user']
#     _, token = AuthToken.objects.create(user)
#
#     return Response({
#         'user_info': {
#             'username': user.username,
#         },
#         'token': token
#     })
class login_api(generics.GenericAPIView):
    serializer_class = AuthTokenSerializer
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)

        return Response({
            'success':True,
            'token': token
        })
# Create your views here.
class register_api(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # print(request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validate(attrs=request.data)  # 判斷密碼是否相同
        serializer2 = UserSerializer(data=request.data)
        serializer2.is_valid()
        serializer2.save()
        user = serializer.save()
        return Response({
            'success':True
        })
