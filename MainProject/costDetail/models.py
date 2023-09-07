# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CostDetail(models.Model):
    cid = models.AutoField(db_column='cID', primary_key=True)  # Field name made lowercase.
    uid = models.IntegerField(db_column='uID')  # Field name made lowercase.
    resname = models.CharField(db_column='ResName', max_length=20)  # Field name made lowercase.
    date = models.DateField()
    which_meal = models.IntegerField()
    rid = models.IntegerField(db_column='rID')  # Field name made lowercase.
    price = models.IntegerField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    my_text = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = '1_cost_detail'
