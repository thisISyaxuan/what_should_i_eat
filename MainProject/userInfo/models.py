# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class UserInfo(models.Model):
    uid = models.AutoField(db_column='uID', primary_key=True)  # Field name made lowercase.
    username = models.CharField(max_length=20)
    gender = models.IntegerField()
    birthday = models.DateField()
    phone_number = models.CharField(max_length=11)
    address = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    verify_password = models.CharField(max_length=20)
    money = models.IntegerField()
    sign = models.DateTimeField(blank=True, null=True)
    skin = models.IntegerField()

    class Meta:
        managed = False
        db_table = '1_user_info'
