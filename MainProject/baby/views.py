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
class buy_baby(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        # 數字不能當id
        baby_id = request.data('baby_id')
        with open('./price/price.txt') as f:
            total_baby_price = f.readline().split(',')
        total_baby_price = np.array(total_baby_price)
        baby_price = int(total_baby_price[baby_id-1])
        if user.is_authenticated:
            user_id = user.id
            user_money = UserInfo.objects.filter(uid = user_id).values()[8]
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
                data = {baby_id:1}
                UidBaby.objects.filter(uid = user_id).update(**data)

                return Response({
                    'success':True
                })
