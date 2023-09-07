from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UidBaby
from django.db.models import Q

class baby(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        updated_request = request.data
        user = request.user
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
                'success': result
            })
        return Response({
            'success': False
        })