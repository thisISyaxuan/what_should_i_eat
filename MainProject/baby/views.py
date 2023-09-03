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
        if user.is_authenticated:
            user_id = user.id
            allBaby = UidBaby._meta.get_fields()
            babyID = [field.name for field in allBaby]
            user_baby = list(UidBaby.objects.filter(uID=user_id))
            for id in user_baby:
                user_baby_filtered = user_baby.filter(id=1).values()
            return Response({
                # 前端名稱
                'success': True
            })
        return Response({
            'success': False
        })