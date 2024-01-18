from django.db import models
from User.models import Users


muscular_groups = (
    ("Chest", "Chest"),
    ("Back", "Back"),
    ("Legs", "Legs"),
    ("Shoulders", "Shoulders"),
    ("Biceps", "Biceps"),
    ("Triceps", "Triceps"),
    ("Trapezius", "Trapezius"),
    ("Abs", "Abs"),
)

lbs_kg = (
    ("lbs", "lbs"),
    ("kg", "kg"),
)

#Model for Days of the week
class Days(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
#Model for Routine
class Routine(models.Model):
    name = models.CharField(max_length=250)
    days = models.ManyToManyField(Days)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

    def __str__(self):
        return self.exercise

#Model for Exercise
class Exercise(models.Model):
    name = models.CharField(max_length=50, unique=True)
    muscle_group = models.CharField(max_length=50, choices=muscular_groups)
    description = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.name

class Record(models.Model):
    day = models.ForeignKey(Days, on_delete=models.CASCADE)
    routine = models.ForeignKey(Routine, on_delete=models.SET_NULL, null=True)
    now = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return str(self.now)

class DetailExerciseRoutine(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE)
    record = models.ForeignKey(Record, on_delete=models.CASCADE)
    day = models.ForeignKey(Days, on_delete=models.CASCADE)
    Weight = models.IntegerField()
    lbs_kg = models.CharField(max_length=50, choices=lbs_kg, default="kg")
    reps = models.PositiveIntegerField()
    number_of_set = models.PositiveIntegerField()

    @classmethod
    def compare(cls, record1, record2):
        details_record1 = list(cls.objects.filter(record=record1).order_by('exercise__muscle_group','exercise__name'))
        details_record2 = list(cls.objects.filter(record=record2).order_by('exercise__muscle_group','exercise__name'))
        result = {}
        details_record1 = list(map(lambda x: {
        'exercise': x.exercise.name,
        'Weight': x.Weight,
        'lbs_kg': x.lbs_kg,
        'reps': x.reps,
        'number_of_set': x.number_of_set
    }, details_record1))
        details_record2 = list(map(lambda x: {
        'exercise': x.exercise.name,
        'Weight': x.Weight,
        'lbs_kg': x.lbs_kg,
        'reps': x.reps,
        'number_of_set': x.number_of_set
    }, details_record2))
        

        for dt1, dt2 in zip(details_record1,details_record2):
            if dt1["exercise"] == dt2["exercise"]:
                weightRecord1 = round(dt1["Weight"] * 2.20462,2) if dt1["lbs_kg"] != "kg" else dt1["Weight"]
                weightRecord2 = round(dt2["Weight"] * 2.20462,2) if dt2["lbs_kg"] != "kg" else dt2["Weight"]

                comparison = {
                    "weight": {"record1":weightRecord1, "record2":weightRecord2,"diff": round(weightRecord1 - weightRecord2,2) * -1},
                    "reps": {"record1": dt1["reps"], "record2": dt2["reps"],"diff": (dt1["reps"] - dt2["reps"]) * -1},
                    "set":dt1["number_of_set"]
                }

                result[f"{dt1['exercise']}-{dt1['number_of_set']}"] = comparison

        return result    

