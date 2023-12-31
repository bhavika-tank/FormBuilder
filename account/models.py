from email.policy import default
from enum import unique
from statistics import mode
from unittest.util import _MAX_LENGTH
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,AbstractUser,BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


USER_TYPES=[
    ('COMPANY', 'company'),
    ('STAFF', 'staff'),
    ('USER', 'user'),
    
]
class CustomUser(AbstractUser):
    
    username = models.CharField(max_length=50,null=True,blank=True)
    type = models.CharField(max_length=10,choices=USER_TYPES,null=True,blank=True)
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    create_date = models.DateTimeField("Date and time", auto_now_add=True,null=True)
    is_status = models.BooleanField(default=False)
    created_by = models.CharField(max_length=50,null=True,blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return_str = None
        if self.username:
            return_str = self.username
        else:
            return_str = self.email
        return return_str

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True


class Company(CustomUser):
    companyname = models.CharField(max_length=250)
    

    class Meta:
        verbose_name = 'Company'  # Change the display name for Company
        verbose_name_plural = 'Companies'  # Change the plural form display name
    
    def __str__(self):
        return self.companyname
    