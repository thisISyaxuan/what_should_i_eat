from django.shortcuts import render
from knox.models import AuthToken
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CostSerializer
from restaurant.models import Restaurant


class cost_detail(generics.GenericAPIView):
    serializer_class = CostSerializer
    def post(self, request, *args, **kwargs):
        updated_request = request.data
        user = request.user
        if user.is_authenticated:
            user_id = user.id
            rid = Restaurant.objects.filter(rname=request.data['ResName']).values()
            updated_request.update({'uid':user_id,'rid':rid[0]['rid']})
            serializer = self.get_serializer(data = updated_request)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'success': True
            })
        return Response({
            'success': False
        })