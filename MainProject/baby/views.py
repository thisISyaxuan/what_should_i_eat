from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from userInfo.models import UserInfo
from .models import UserBaby
import numpy as np
class baby(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("got a /baby/baby request")
        user = request.user
        print(user)
        if user.is_authenticated:
            user_id = user.id
            select = UserBaby.objects.filter(uid=user_id).values()
            user_money = UserInfo.objects.filter(uid=user_id).values()[0]['money']
            myBaby = []
            for item in select:
                myBaby.append(item['babyid'])
            print(myBaby)
            return Response({
                # 前端名稱
                'ownedBabies': myBaby,
                'coins':user_money
            })
        return Response({
            'ownedBabies': False
        })
class buy_baby(generics.GenericAPIView):
    serializer_class = UserBaby
    def post(self, request, *args, **kwargs):
        user = request.user
        baby_id = request.data['baby_Id']
        total_baby_price = [70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 70, 70, 70, 70, 70, 40, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70, 120, 120, 120, 120, 120, 70]
        baby_price = int(total_baby_price[baby_id-1])
        if user.is_authenticated:
            user_id = user.id
            user_money = UserInfo.objects.filter(uid = user_id).values()[0]['money']
            if user_money < baby_price:
                return Response({
                    'success':False
                })
            else:
                # update user_info money
                money = user_money - baby_price
                update_user_info = UserInfo.objects.get(uid=user_id)
                update_user_info.money = money
                update_user_info.save()

                # update UidBaby column
                UserBaby.objects.create(uid = user_id,babyid=baby_id)

                return Response({
                    'success':True,
                    'coins':money
                })
