# Generated by Django 4.2.3 on 2023-07-13 16:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_user_table'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='user',
            new_name='users',
        ),
        migrations.AlterModelTable(
            name='users',
            table='users',
        ),
    ]
