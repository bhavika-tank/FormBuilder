from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.forms import ModelForm
from django.core.validators import validate_email
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from .models import Company


User = get_user_model()

class LoginForm(forms.Form):
    email = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder" : "Email",
                # "class": "form-control"
                "class": "input100 border-start-0 form-control ms-0",
                "aria-label" : "Email",
                "aria-describedby" : "email-addon",
            }
        ))
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                "placeholder" : "Password",
                # "class": "form-control"
                "class": "input100 border-start-0 form-control ms-0",
                "aria-label" : "Password",
                "aria-describedby" : "password-addon",
            }
        ))

class SignUpForm(UserCreationForm):
    
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder' : "Username",
                'class': "form-control",
                'autofocus': True,
                'aria-describedby':"email-addon",
                'aria-label':"Username",
            }
        ))
    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={
                'placeholder' : "Email",
                'class': "form-control",
                'aria-describedby':"email-addon",
                'aria-label':"Email",
            }
        ))
    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'placeholder' : "Password",
                'class': "form-control",
                'aria-describedby':"password-addon",
                'aria-label':"Password",
            }
        ))
    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'placeholder' : "Confirm Password",
                'class': "form-control",
                'aria-describedby':"password-addon",
                'aria-label':"Confirm Password",
            }
        ))
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'type', 'created_by')

        widgets = {
            'type': forms.HiddenInput(),
            'created_by': forms.HiddenInput(),
        }


class UpdateUserCustomForm(ModelForm):
    class Meta:
        model = User

        fields = ('username', 'email')

        widgets = {
            'type':forms.HiddenInput(),
            'username':forms.TextInput(
                attrs={
                    'required' : True,
                    'class':'form-control',
                    'placeholder':"UserName",
                    'type':"text",
                }
            ),
            'email':forms.TextInput(
                attrs={
                    'required' : True,
                    'class':'form-control',
                    'placeholder':"E-Mail",
                    'type':"text",
                }
            ),
        }

class UpdateStaffForm(ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email')

        widgets = {
            'type':forms.HiddenInput(),
            'username':forms.TextInput(
                attrs={
                    'required' : True,
                    'class':'form-control',
                    'placeholder':"UserName",
                    'type':"text",
                }
            ),
            'email':forms.TextInput(
                attrs={
                    'required' : True,
                    'class':'form-control',
                    'placeholder':"E-Mail",
                    'type':"text",
                }
            ),
        }

class CompanyForm(SignUpForm):
    
    companyname = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder' : "Companyname",
                'class': "form-control",
                'autofocus': True,
                'aria-describedby':"email-addon",
                'aria-label':"Companyname",
            }
        ))
    
    class Meta:
        model = Company
        fields = ('companyname','username', 'email', 'password1', 'password2', 'type')

        widgets = {
            'type': forms.HiddenInput()
        }
    
class CompanyUpdateForm(ModelForm):
    
    companyname = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder' : "Companyname",
                'class': "form-control",
                'autofocus': True,
                'aria-describedby':"email-addon",
                'aria-label':"Companyname",
            }
        ))
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder' : "Username",
                'class': "form-control",
                'autofocus': True,
                'aria-describedby':"email-addon",
                'aria-label':"Username",
            }
        ))
    email = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'placeholder' : "Email",
                'class': "form-control",
                'autofocus': True,
                'aria-describedby':"email-addon",
                'aria-label':"Email",
            }
        ))
    
    class Meta:
        model = Company
        fields = ('companyname','username', 'email')
