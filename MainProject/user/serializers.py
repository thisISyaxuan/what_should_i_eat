from rest_framework import serializers, validators
from .models import user_info
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[validators.UniqueValidator(queryset=user_info.objects.all())]
    )

    class Meta:
        model = user_info
        fields = (
        'uID', 'username', 'gender', 'birthday', 'phone_number', 'address', 'email', 'password', 'verify_password')

        extra_kwargs = {
            "username": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        user_info.objects.all()
                    )
                ]
            },
            "password": {"write_only": True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['verify_password']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        username = validated_data.get('username')
        gender = validated_data.get('gender')
        birthday = validated_data.get('birthday')
        phone_number = validated_data.get('phone_number')
        address = validated_data.get('address')
        email = validated_data.get('email')
        password = validated_data.get('password')
        verify_password = validated_data.get('verify_password')

        user = user_info.objects.create(
            username=username,
            gender=gender,
            birthday=birthday,
            phone_number=phone_number,
            address=address,
            email=email,
            password=password,
            verify_password=verify_password,
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
