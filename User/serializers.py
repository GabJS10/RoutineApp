from rest_framework.serializers import ModelSerializer
from . models import Users
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class MyTokenUserSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token["email"] = user.email
        token['avatar'] = user.avatar.url
        token['is_staff'] = user.is_staff
        token["biography"] = user.biography
        token["date_joined"] = str(user.date_joined)
        return token