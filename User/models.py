from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
# Create your models here.

class MyUserManager(BaseUserManager):
    def _create_user(self,email,password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self._create_user(email,password,**extra_fields)


class Users(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    biography = models.CharField(max_length=250, blank=True,null = True)
    username = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    avatar = models.ImageField(default="avatar.png")
    date_joined = models.DateTimeField(default=timezone.now)
    objects = MyUserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    class Meta:
        ordering = ["-date_joined"]


    