from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from restaurant.models import Restaurant
from userInfo.models import UserInfo
from .models import CostDetail
from django.db.models import Sum, F

class cost_detail(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        aCost = request.data.copy()
        print(aCost)
        user = request.user
        if user.is_authenticated:
            print("got a /account/cost/")
            msg = False
            user_id = user.id
            try:
                aCostRID = Restaurant.objects.filter(rname=request.data['ResName']).values()[0]['rid']
            except:
                aCostRID = -1
            if (aCostRID > 0):
                # 記帳
                cost = CostDetail.objects.create(uid=user_id, rid=aCostRID, date=aCost['date'], which_meal=aCost['which_meal'], price=aCost['price'], rating=aCost['rating'], my_text=aCost['my_text'])
                cost.save()
                # 雞腿幣
                u = UserInfo.objects.get(uid=user_id)
                u.money = u.money + 20  # 簽到加的金額
                u.save()
                msg = True
            return Response({
                'success': msg
            })
        return Response({
            'success': False
        })

@api_view(['POST'])
def cost_record(request):
    user = request.user
    date = request.data['date']
    data = []
    if user.is_authenticated:
        user_id = user.id
        for i in range(len(CostDetail.objects.filter(uid = user_id,date=date).values())):
            aCost = CostDetail.objects.filter(uid=user_id, date=date).values()[i]
            if (aCost['rid']>0):
                aCost['ResName'] = Restaurant.objects.filter(rid=aCost['rid']).values()[0]['rname']
                print(aCost)
                data.append(aCost)
        total = CostDetail.objects.filter(uid=user_id, date=date, rid__gt=0).aggregate(total=Sum('price'))
        if (total['total'] == None):
            total['total'] = 0
        print(total)
        return Response({
            'data':data,
            'total':total,
            'success': True
        })
    return Response({
        'success': False
    })
@api_view(['POST'])
def cost_record_month(request):
    user = request.user
    year = request.data['year']
    month = request.data['month']
    breakfast= 0
    lunch= 0
    dinner= 0
    other= 0
    if user.is_authenticated:
        user_id = user.id
        month_detail = CostDetail.objects.filter(uid = user_id,date__year=year,date__month=month, rid__gt=0).values()
        for i in range(len(month_detail)):
            if month_detail[i]['which_meal'] == 0:
                breakfast = breakfast + month_detail[i]['price']
            elif month_detail[i]['which_meal'] == 1:
                lunch = lunch + month_detail[i]['price']
            elif month_detail[i]['which_meal'] == 2:
                dinner = dinner + month_detail[i]['price']
            else:
                other = other + month_detail[i]['price']
        # 忘記要哪種格式了
        data = [{'breakfast':breakfast,'lunch':lunch,'dinner':dinner,'others':other}]
        return Response({
            # 'breakfast':{'breakfast':breakfast},
            # 'lunch': {'lunch': lunch},
            # 'dinner': {'dinner': dinner},
            # 'other': {'other': other}
            'data':data,
            # 'breakfast':breakfast,
            # 'lunch':lunch,
            # 'dinner':dinner,
            # 'other':other,
            'success': True
        })
    return Response({
        'success': False
    })

class delete(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("/account/delete/")
        print(request.data)
        cID = request.data
        user = request.user
        if user.is_authenticated:
            user_id = user.id
            CostDetail.objects.filter(uid=user_id, cid=cID).update(rid=F('rid')*-1)
            return Response({
                'success': True
            })
        return Response({
            'success': False
        })