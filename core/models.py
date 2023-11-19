import uuid
from django.db import models
from account.models import *
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class FormAttributes(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    # form_uid = models.UUIDField(default= uuid.uuid4, null=True, blank=True)
    form_uid = models.CharField(max_length=255, null=True, blank=True)
    form_name = models.CharField(max_length=255, null=True, blank=True)
    form_link = models.CharField(max_length=255, null=True, blank=True)
    form_qrcode = models.TextField(null=True, blank=True)
    attributes = models.TextField()
    
    def __str__(self):
        return str(self.form_uid)

class FormValues(models.Model):
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    FormName = models.CharField(max_length=255, null=True, blank=True)
    FormID = models.ForeignKey(FormAttributes, on_delete=models.CASCADE, null=True, blank=True)
    FormValue = models.TextField()
    
    def __str__(self):
        return str(self.FormName)