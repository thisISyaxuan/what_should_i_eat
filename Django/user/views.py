from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import UserSerializer

from .models import users_register
from rest_framework import generics


class userView(viewsets.ModelViewSet):
    # define a variable and populate it
    queryset = users_register.objects.all()
    # assign it to the TodoSerializer class
    serializer_class = UserSerializer


from .serializers import LoginSerializer
from rest_framework.response import Response
class login(viewsets.ModelViewSet):
    # define a variable and populate it
    queryset = users_register.objects.all()
    # assign it to the TodoSerializer class
    serializer_class = LoginSerializer

