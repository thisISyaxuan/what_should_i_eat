from rest_framework import serializers
from .models import users_register


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = users_register
        fields = ('id', 'account', 'gender', 'birthday', 'phone_number', 'address', 'mail', 'password')
        # fields = '__all__'   # 所有欄位可以這樣寫


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = users_register
        fields = ('account', 'password')
        # fields = '__all__'   # 所有欄位可以這樣寫
