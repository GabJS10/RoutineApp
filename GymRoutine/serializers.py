from rest_framework import serializers
from . models import Routine, Exercise, Record, DetailExerciseRoutine, Days
from User.serializers import UserSerializer


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields = ["id","name"]


class RoutineSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Routine
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["days"] = DaySerializer(instance.days.all(), many=True).data
        return representation


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = "__all__"

class RecordSerializer(serializers.ModelSerializer):
    day = serializers.ReadOnlyField(source='day.name')
    class Meta:
        model = Record
        fields = "__all__"

class DetailExerciseRoutineSerializer(serializers.ModelSerializer):
    exercise = serializers.ReadOnlyField(source='exercise.name')
    routine = serializers.ReadOnlyField(source='routine.name')
    day = serializers.ReadOnlyField(source='day.name')
    class Meta:
        model = DetailExerciseRoutine
        fields = "__all__"
