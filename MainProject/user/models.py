from django.db import models


# Create your models here.
class users_register(models.Model):
    account = models.CharField(max_length=20)
    gender = models.IntegerField()
    birthday = models.DateField()
    phone_number = models.IntegerField()
    address = models.CharField(max_length=20)
    mail = models.CharField(max_length=50)
    password = models.CharField(max_length=20)

    class Meta:
        db_table = 'users_register'

    def __str__(self):
        return str(self.name)
