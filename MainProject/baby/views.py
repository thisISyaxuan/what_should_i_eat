from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UidBaby

class baby(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        updated_request = request.data
        user = request.user
        print(user)
        print(user.is_authenticated)
        if user.is_authenticated:
            user_id = user.id
            result = UidBaby.objects.filter(uid=user_id).values()
            result = result[0]
            result = [key for key, value in result.items() if value == 1]
            result = [int(item.split('_')[1]) for item in result]
            # print(type(result[0]))
            print(result)
            return Response({
                # 前端名稱
                'ownedBabies': result
            })
        return Response({
            'ownedBabies': False
        })