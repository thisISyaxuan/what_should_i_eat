
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from rest_framework.authtoken.models import Token


# Create your models here.
class user_info(models.Model):
    uID = models.AutoField(unique=True,primary_key=True)
    username = models.CharField(max_length=20)
    gender = models.IntegerField()
    birthday = models.DateField()
    phone_number = models.IntegerField()
    address = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    verify_password = models.CharField(max_length=20)

    class Meta:
        db_table = 'user_info'


