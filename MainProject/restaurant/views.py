from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant
from django.http import QueryDict
from . import recommender
class recommend(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("got a /recommend/restaurant/ request")
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
            print("BEFORE")
            # DataFrameResult = recommender.main(user.id, updated_request['TimeFilter'], updated_request['MealFilter'], updated_request['LabelFilter'], [23, 120], updated_request['DistanceSort'], updated_request['RatingSort'])
            DataFrameResult = recommender.main(user.id, updated_request['TimeFilter'], updated_request['MealFilter'], updated_request['LabelFilter'], updated_request['userPos'], updated_request['DistanceSort'], updated_request['RatingSort'])
            print("AFTER")
            print(type(DataFrameResult))
            print(DataFrameResult.shape)
            return Response({
                # 前端名稱
                # rName rMap_Score rPhone rAddress BigLabel open distance collect rID
                # {"success": {"rName": [], "rMa_Score": [], "rAddress": [], "open": []}}
                'success': DataFrameResult
            })
        return Response({
            'success': False
        })

class collect(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request.data['userPos'], request.data['SortingMethod'])
        user = request.user
        if user.is_authenticated:
            # uID, userPos, SortingMethod
            DataFrameResult = select_collect.main(user.id, request.data['userPos'], request.data['SortingMethod'])
            # print(DataFrameResult.columns)
            return Response({
                'success': DataFrameResult
            })
        return Response({
            'success': False
        })