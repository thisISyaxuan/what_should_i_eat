# Generated by Django 4.2.3 on 2023-07-14 15:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_users_table'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='users',
            new_name='users_register',
        ),
    ]
