from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant
from . import recommender
class recommend(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        updated_request = request.data
        user = request.user
        if user.is_authenticated:
            # uID, TimeFilter, MealFilter, LabelFilter, userPos, DistanceSort, RatingSort
            DataFrameResult = recommender.main(user.id, updated_request['TimeFilter'], updated_request['MealFilter'], updated_request['LabelFilter'], updated_request['userPos'], updated_request['DistanceSort'], updated_request['RatingSort'])
            print(DataFrameResult)
            return Response({
                # 前端名稱
                # rID 店名 時間 評分 距離 電話 地址
                # {"success": {"rName": [], "rMa_Score": [], "rAddress": [], "open": []}}
                'success': DataFrameResult
            })
        return Response({
            'success': False
        })