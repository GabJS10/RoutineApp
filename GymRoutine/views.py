from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import generics
from rest_framework import status
from . serializers import DaySerializer, RoutineSerializer, ExerciseSerializer, RecordSerializer, DetailExerciseRoutineSerializer
from .models import Days, Routine, Exercise, Record, DetailExerciseRoutine
from User.models import Users
# Create your views here.



@api_view(['GET'])
def compare_detail_exercise(request,record1,record2):
    if request.user.is_authenticated:

        r1 = Record.objects.get(pk=record1)
        r2 = Record.objects.get(pk=record2)

        if r1.day.pk != r2.day.pk:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST)

        if r1 == r2:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST) 

        comparison = DetailExerciseRoutine.compare(record1=r1, record2=r2)
        return Response({"ok":True,"comparison":comparison}, status=status.HTTP_202_ACCEPTED)
    return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)
@api_view(['GET'])
def list_records(request, routineId, dayId):
    if request.user.is_authenticated:
        user = Users.objects.get(pk=request.user.id)
        try:
            r = Routine.objects.get(pk=routineId)
            d = Days.objects.get(pk=dayId)
            records = Record.objects.filter(user=user,day=d,routine=r)
            serializer = RecordSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)


#fix vistas de creacion de dia y exercise para que solo pueda ser creado por el superusuario
@api_view(['GET'])
def list_detail_exercise_routine(request,recordId):
    if request.user.is_authenticated:

        data = request.data

        try:
            r = Record.objects.get(pk=recordId)
            dter = DetailExerciseRoutine.objects.filter(record=r,routine=r.routine.pk,day=r.day.pk).order_by('exercise__muscle_group','exercise__name')
            serializer = DetailExerciseRoutineSerializer(dter, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def delete_detail_exercise_routine(request,pk):
    if request.user.is_authenticated:
        try:
            dter = DetailExerciseRoutine.objects.get(pk=pk)
            dter.delete()
            return Response({"message":"Exercise deleted"},status=status.HTTP_200_OK)
        except:
            return Response({"error":True,"message":"Not found"},status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_detail_exercise_routine(request,detailId):
    if request.user.is_authenticated:
        data = request.data
        print(data)
        try:
            dter = DetailExerciseRoutine.objects.get(pk=detailId)
            dter.exercise = Exercise.objects.get(pk=data["exercise"])
            dter.Weight = data["weight"]
            dter.lbs_kg = data["unit"] or "kg"
            dter.reps = data["reps"]
            dter.number_of_set = data["set"]
            dter.save()
            serializer = DetailExerciseRoutineSerializer(dter, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_detail_exercise_routine(request):
    if request.user.is_authenticated:
        data = request.data
        print(data)
        try:
            r = Record.objects.get(pk=data["record"])
            d = Days.objects.get(pk=r.day.pk)
            dter=DetailExerciseRoutine.objects.create(
                exercise=Exercise.objects.get(pk=data["exercise"]),
                routine=Routine.objects.get(pk=r.routine.pk),
                record=r,
                day=d,
                Weight=data["weight"],
                lbs_kg=data["unit"] or "kg",
                reps=data["reps"],
                number_of_set=data["set"],
            )
            serializer = DetailExerciseRoutineSerializer(dter, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def create_records(request):
    if request.user.is_authenticated:
        data = request.data
        user = request.user
        
        if data:

            r = Routine.objects.get(pk=data["routine"])

            days = r.days.all()
            

            if int(data["day"]) not in [d.pk for d in days]:
                return Response({"error":True,"message":"Day not in routine"},status=status.HTTP_400_BAD_REQUEST)


            record = Record.objects.create(
            user=user,
            day=Days.objects.get(pk=data["day"]),
            routine=r,
        )
        
            serializer = RecordSerializer(record, many=False)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response({"error":True,"message":"Day not found"},status=status.HTTP_400_BAD_REQUEST)
        
    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)        


#only staff can create days
class create_days(generics.ListCreateAPIView):
    queryset = Days.objects.all()
    permission_classes = [IsAuthenticated,IsAdminUser]
    serializer_class = DaySerializer

#only staff can create days
class create_exercise(generics.ListCreateAPIView):
    queryset = Exercise.objects.all()
    permission_classes = [IsAuthenticated,IsAdminUser]
    serializer_class = ExerciseSerializer


class get_days(generics.ListAPIView):
    queryset = Days.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DaySerializer

class get_exercises(generics.ListAPIView):
    queryset = Exercise.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ExerciseSerializer

@api_view(['POST'])
def create_routine(request):
    if request.user.is_authenticated:
        data = request.data.copy()
        user = Users.objects.get(id=request.user.id)
        data["user"] = user.pk
        
        print(len(data["days"]),data["days"])

        if len(data["days"]) == 0:
            return Response({"error":True,"message":"Days not found"},status=status.HTTP_400_BAD_REQUEST)

        serializer = RoutineSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)    


class get_routine(generics.RetrieveAPIView):
    queryset = Routine.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = RoutineSerializer

class delete_routine(generics.DestroyAPIView):
    queryset = Routine.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = RoutineSerializer

@api_view(['GET'])
def list_routine(request):
    if request.user.is_authenticated:
        user = Users.objects.get(pk=request.user.id)
        routine = Routine.objects.filter(user=user)
        serializer = RoutineSerializer(routine, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)