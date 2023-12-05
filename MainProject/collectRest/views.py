from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import QueryDict
from .models import UserCollectrest
from . import GoSelect

class add_or_delete(generics.GenericAPIView):
    serializer_class = UserCollectrest
    def post(self, request, *args, **kwargs):
        print("/collect/rest/")
        print(request.data)
        user = request.user
        if (type(request.data['rID']) == type(0)):
            rID = request.data['rID']
        else:
            rID = request.data['rID'][0]
        print(rID)
        if user.is_authenticated:
            user_id = user.id
            # 前端給0表收藏 前端給1表取消收藏
            if (request.data['collect'] == 0):
                serializer0 = UserCollectrest.objects.create(uid=user_id, rid=rID)
                serializer0.save()
            else:
                UserCollectrest.objects.filter(uid=user_id, rid=rID).delete()
            return Response({
                'success':True
            })

class show(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("/collect/show/")
        print(request.data)
        MyRequest  = request.data
        user = request.user
        if user.is_authenticated:
            user_id = user.id
            # DataFrameResult = GoSelect.main(user.id, [23, 120], updated_request['sorting'])
            data = list(UserCollectrest.objects.filter(uid=user_id).values())
            print(data)
            CollectList = [item['rid'] for item in data]
            DataFrameResult = GoSelect.main(user.id, CollectList, MyRequest['userPos'], MyRequest['sorting'])
            print(DataFrameResult)
            return Response({
                # rName rMap_Score rPhone rAddress BigLabel open distance collect rID
                # {"success": {"rName": [], "rMa_Score": [], "rAddress": [], "open": []}}
                'success': DataFrameResult
            })