from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from . models import Users
from . serializers import MyTokenUserSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
# Create your views here.

@api_view(['PUT'])
def updateDataUser(request):
    if request.user.is_authenticated:
        data = request.data.copy()
        User = Users.objects.get(pk=request.user.id)

        try:
            if data.get("username"):
                User.username = data["username"]
            if data.get("biography"):
                User.biography = data["biography"]
            if data.get("avatar"):
                User.avatar = data["avatar"]
            User.save()

            return Response(UserSerializer(User,many=False).data, status=status.HTTP_200_OK)

        except:
            return Response({"error":True,"message":"Verify your data"},status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({"error":True},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        username = data["username"] 
        email = data["email"] 
        password = make_password(data["password"]) 

        if username and email and password:
            user = Users.objects.create(
                username=username,
                email=email,
                password=password
            )
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({"error":True},status=status.HTTP_400_BAD_REQUEST) 

class TokenLoginView(TokenObtainPairView):
    serializer_class = MyTokenUserSerializer