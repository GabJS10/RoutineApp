from django.urls import path
from . import views

urlpatterns = [
    path("createDay/",view=views.create_days.as_view()),
    path("createExercise/",view=views.create_exercise.as_view()),
    path("getExercises/",view=views.get_exercises.as_view()),
    path("createRoutine/",view=views.create_routine),
    path("listRoutine/",view=views.list_routine),
    path("createRecords/",view=views.create_records),
    path("listRecords/<int:routineId>/<int:dayId>",view=views.list_records),
    path("createDetailRoutine/",view=views.create_detail_exercise_routine),
    path("listDetailRoutine/<int:recordId>/",view=views.list_detail_exercise_routine),
    path("updateDetailRoutine/<int:detailId>",view=views.update_detail_exercise_routine),
    path("deleteDetailRoutine/<int:pk>",view=views.delete_detail_exercise_routine),
    path("deleteRoutine/<int:pk>/",view=views.delete_routine.as_view()),
    path("getRoutine/<int:pk>/",view=views.get_routine.as_view()),
    path("compareDetailExercise/<int:record1>/<int:record2>",view=views.compare_detail_exercise),
]