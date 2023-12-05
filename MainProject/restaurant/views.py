from rest_framework import generics
from rest_framework.response import Response
from .models import Restaurant
from django.http import QueryDict
from . import recommender
from collectRest.models import UserCollectrest
import random
from datetime import datetime, timedelta, time

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
            print(DataFrameResult)
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

class randomRest(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        print("got a /recommend/random/ request")
        user = request.user
        if user.is_authenticated:
            user_id = user.id
            num = Restaurant.objects.count()
            aRest = {}
            while(True):
                index = random.randint(1,num)
                # print(index)
                aRest = Restaurant.objects.all().values()[index-1]
                # print(aRest)
                aRest = check(user_id, aRest)
                if (aRest['open'] > -1 ):
                    print(aRest)
                    break
            return Response({
                # {"success": {"rName": [], "rMa_Score": [], "rAddress": [], "open": []}}
                # 'success': {"rID": 6, "rName": "test", "rMa_Score": "test", "rAddress": "test", "rPhone": "test", "open": 1, "collect": 1}
                'success': aRest
            })
        return Response({
            'success': False
        })
def check(user_id, aRest):
    collect = len(UserCollectrest.objects.filter(uid=user_id, rid=aRest['rid']).values())
    result = {
        "rID": aRest['rid'],
        "rName": aRest['rname'],
        "rMap_Score": aRest['rmap_score'],
        "rAddress": aRest['raddress'],
        "rPhone": aRest['rphone'],
        "open": openORnot(aRest),
        "collect": collect
    }
    return result

def openORnot(aRest):
    open = 999
    date = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']
    day_of_week = datetime.today().weekday()
    currentTime = datetime.now().time()
    # ----
    RestaurantTime = aRest[date[day_of_week]].split(';')
    # print(RestaurantTime)
    openCheck = [False] * len(RestaurantTime)
    # print(openCheck)
    for index, eachTime in enumerate(RestaurantTime):
        eachTime = eachTime.strip().split('~')
        # print(eachTime)
        if (eachTime != ['']):
            start_time = time(int(eachTime[0].split(':')[0]), int(eachTime[0].split(':')[1][0]))
            end_time = time(int(eachTime[1].split(':')[0]), int(eachTime[1].split(':')[1]))
            # print(start_time)
            # print(currentTime)
            # print(end_time)
            if (start_time <= currentTime <= end_time):
                after30 = datetime.now() + timedelta(minutes=30)
                # print("-------------")
                # print(after30, end_time)
                # print("-------------")
                if (after30.time() >= end_time):
                    openCheck[index] = 0    # 營業中
                else:
                    openCheck[index] = 1    # 快關了
            else:
                openCheck[index] = -1    # 沒開 
    # print(openCheck)
    if (-1 not in openCheck):
        if(0 not in openCheck):
            open = 1    # 營業中
        else:
            open = 0    # 快關了
    else:
        open = -1   # 沒開
    return open
