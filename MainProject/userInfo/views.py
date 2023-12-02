from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from .serializers import RegisterSerializer,UserSerializer,UserLikeSerializer
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from userLike import label_convert
from .models import UserInfo
from baby.models import UserBaby
from restaurant.models import Restaurant
import datetime
from . import mail
import base64

@api_view(['POST'])
def user_sign(request):
    user = request.user
    if user.is_authenticated:
        username = user.username
        user_info = UserInfo.objects.filter(username=username).values()[0]
        money = user_info['money']
        date1 = user_info['sign'].strftime('%Y-%m-%d %H:%M:%S')
        date2 = datetime.datetime.now()
        date1 = datetime.datetime.strptime(date1, "%Y-%m-%d %H:%M:%S")
        if date1.date() != date2.date():
            u = UserInfo.objects.get(username=username)
            u.sign = date2
            u.money = money + 100 # 簽到加的金額
            u.save()
            print(123)
            return Response({
                'success':True,
                'coins':money + 100 # 簽到加的金額
            })
        else:
            return Response({
                'success':False,
                'coins':money
            })

@api_view(['POST'])
def user_skin(request):
    user = request.user
    print('user_skin')
    print(request.data)
    if user.is_authenticated:
        username = user.username
        u = UserInfo.objects.get(username=username)
        u.skin = request.data['baby_image_id']
        u.save()
        return Response({
            'success':True
        })
    return Response({
        'success':False
    })

@api_view(['POST'])
def get_user_data(request):
    print(request.data,"get_user_data")
    user = request.user
    if user.is_authenticated:
        username = user.username
        gender = UserInfo.objects.filter(username=username).values()[0]['gender']
        birthday = UserInfo.objects.filter(username=username).values()[0]['birthday']
        phone = UserInfo.objects.filter(username=username).values()[0]['phone_number']
        address = UserInfo.objects.filter(username=username).values()[0]['address']
        skin = UserInfo.objects.filter(username=username).values()[0]['skin']
        print(username, skin)
        return Response({
            'id': user.id,
            'username': user.username,
            'gender': gender,
            'birthday': birthday,
            'phone': phone,
            'address': address,
            'email': user.email,
            'avatarId':skin
        })
    else:
        return Response({
            'error':'not authenticated'
        },status = 400)

class login_api(generics.GenericAPIView):
    serializer_class = AuthTokenSerializer
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        _, token = AuthToken.objects.create(user)
        print(token)
        return Response({
            'success':True,
            'token': token
        })
# Create your views here.
class register_api(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print('/api/Register/')
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validate(attrs=request.data)  # 判斷密碼是否相同
        print('serializer2')
        serializer2 = UserSerializer(data=request.data)
        serializer2.is_valid()
        print(request.data["preferences"])
        big_label = request.data["preferences"]
        small_label = []
        label = {}

        for i in range(len(big_label)):
            small_label = small_label+label_convert.get(big_label[i])

        for i in range(len(small_label)):
            print(small_label[i])
            print(label)
            label[small_label[i]] = 1 # 小標籤評分

        # label[small_label[米苔目]] += 0.1  # 小標籤評分

        serializer3 = UserLikeSerializer(data=label)
        serializer3.is_valid()
        serializer3.save()

        serializer2.save()
        serializer.save()

        name = request.data['username']
        uid = UserInfo.objects.filter(username=name).values()[0]['uid']
        serializer4 = UserBaby.objects.create(uid=uid,babyid=1)
        serializer4.save()

        return Response({
            'success':True
        })

@api_view(['POST'])
def get_user_money(request):
    user = request.user
    if user.is_authenticated:
        uid = user.id
        money = UserInfo.objects.filter(uid=uid).values()[0]['money']
        return Response({
            'coins':money
        })
    else:
        return Response({
            'error':'not authenticated'
        },status = 400)

# 錯誤回報
class RestInfoWrong(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("got a /api/RestInfoWrong/ request")
        data = request.data
        user = request.user
        data['rPhone'] = "0963630190"
        data['rAddress'] = "南投縣埔里鎮大學一號"
        data['open'] = "12:00~13:30"
        data['rPhoto'] = image_to_base64()
        # data['rPhoto'] = ""
        data['rText'] = "Hello"
        data['rID'] = 4
        if user.is_authenticated:
            uid = user.id
            uName = UserInfo.objects.filter(uid=uid).values()[0]['username']
            uEmail = UserInfo.objects.filter(uid=uid).values()[0]['email']
            rName = Restaurant.objects.filter(rid=data['rID']).values()[0]['rname']
            print(uid, uName, uEmail)
            status = mail.main(uid, uName, uEmail, data['rID'], rName, data['rPhone'], data['rAddress'], data['open'], data['rPhoto'], data['rText'])
            return Response({
                'success': "status"
            })
        return Response({
            'success': False
        })

def image_to_base64():
    PATH = "D:/user/Downloads/logo 1 (1).png"
    try:
        # 開啟圖片文件並讀取二進制數據
        with open(PATH, 'rb') as file:
            image_data = file.read()
        # 將二進制數據轉換為 base64 字串
        base64_data = base64.b64encode(image_data).decode('utf-8')
        print(type(base64_data))
        return base64_data
    except FileNotFoundError:
        print("File not found.")
        return None