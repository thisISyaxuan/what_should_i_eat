from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import users_register

admin.site.register(users_register)