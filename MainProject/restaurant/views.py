from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import QueryDict
from .models import Restaurant
from . import recommender
class recommend(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        # print(request.data)
        temp  = request.data
        query_dict = QueryDict('', mutable=True)
        query_dict.update(temp)
        print(type(query_dict))
        print(query_dict)
        updated_request = query_dict
        user = request.user
        if user.is_authenticated:
            # uID, TimeFilter, MealFilter, LabelFilter, userPos, DistanceSort, RatingSort
            # print(updated_request['userPos'][0])
            DataFrameResult = recommender.main(user.id, updated_request['TimeFilter'], updated_request['MealFilter'], updated_request['LabelFilter'], updated_request['userPos'], updated_request['DistanceSort'], updated_request['RatingSort'])
            print(DataFrameResult.columns)
            return Response({
                # 前端名稱
                # rID 店名 時間 評分 距離 電話 地址
                # {"success": {"rName": [], "rMa_Score": [], "rAddress": [], "open": []}}
                # {"success": DataFrameResult}
                'success': DataFrameResult
            })
        return Response({
            'success': False
        })