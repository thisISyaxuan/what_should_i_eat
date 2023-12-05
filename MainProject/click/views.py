from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from restaurant.models import Restaurant
import datetime
from django.http import QueryDict
from .models import userClick
from . import GoSelect
from collectRest.models import UserCollectrest

class click(generics.GenericAPIView):
    serializer_class = userClick
    def post(self, request, *args, **kwargs):
        print(request.data)
        user = request.user
        if (type(request.data['rID']) == type(0)):
            rID = request.data['rID']
        else:
            rID = request.data['rID'][0]
        print("hell iam rID", rID)
        if user.is_authenticated:
            user_id = user.id
            userClick.objects.filter(uid=user_id, rid=rID).delete()
            serializer4 = userClick.objects.create(uid=user_id, rid=rID, ctime=datetime.datetime.now())
            serializer4.save()
            result = len(UserCollectrest.objects.filter(uid=user_id, rid=rID).values())
            print(result)
            collect = 2
            if (result==0):
                collect = 0
            else:
                collect = 1
            return Response({
                'success': {'collect' : collect}
            })

class show(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("got a /click/show request")
        data  = request.data
        print(data)
        user = request.user
        if user.is_authenticated:
            user_id = user.id
            # DataFrameResult = GoSelect.main(user.id, [23, 120])
            thisUser = list(userClick.objects.filter(uid=user_id).values())
            ClickList = [item['rid'] for item in thisUser]
            print(ClickList)
            DataFrameResult = GoSelect.main(user.id, ClickList, data['userPos'])
            print(DataFrameResult)
            return Response({
                # rName rMap_Score rPhone rAddress BigLabel open distance collect rID
                # {"success": {"rName": [], "rMa_Score": [], "rAddress": [], "open": []}}
                'success':DataFrameResult.head(50)
            })