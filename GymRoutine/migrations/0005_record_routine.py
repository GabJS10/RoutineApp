# Generated by Django 5.0 on 2024-01-02 15:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GymRoutine', '0004_detailexerciseroutine_lbs_kg'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='routine',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='GymRoutine.routine'),
        ),
    ]
