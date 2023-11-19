from django.contrib.auth.decorators import login_required, user_passes_test
from django.urls import reverse_lazy
from django.contrib.auth import get_user_model
from .models import CustomUser
User = get_user_model()


# For SuperUser Required
def is_superuser_available(request):
    user = request
    print(user.is_superuser)
    if user.is_superuser:
        return True
    else:
        return False
superus_login_required = user_passes_test(is_superuser_available, login_url='account:NotPageFound')

def superuser_login_required(view_func):
    decorated_view_func = login_required(superus_login_required(view_func), login_url='/')
    return decorated_view_func



# For Company Required
def is_company_available(request):
    user = request
    if (user.type) == 'COMPANY':
        return True
    else:
        return False
com_login_required = user_passes_test(is_company_available, login_url='account:NotPageFound')

def company_login_required(view_func):
    decorated_view_func = login_required(com_login_required(view_func), login_url='/')
    return decorated_view_func


# For Staff Required
def is_staff_available(request):
    user = request
    if (user.type) == 'STAFF':
        return True
    else:
        return False
sta_login_required = user_passes_test(is_staff_available, login_url='account:NotPageFound')

def staff_login_req(view_func):
    decorated_view_func = login_required(sta_login_required(view_func), login_url='/')
    return decorated_view_func

# For User Required
def is_user_available(request):
    user = request
    if (user.type) == 'USER':
        return True
    else:
        return False
us_login_required = user_passes_test(is_user_available, login_url='account:NotPageFound')

def user_login_required(view_func):
    decorated_view_func = login_required(us_login_required(view_func), login_url='/')
    return decorated_view_func



def staff_permission(request):
    user = request
    if user.is_superuser or (user.type) == 'COMPANY':
        return True
    else:
        return False
staff_per_required = user_passes_test(staff_permission, login_url='account:NotPageFound')

def staff_login_required(view_func):
    decorated_view_func = login_required(staff_per_required(view_func), login_url='/')
    return decorated_view_func



def user_permission(request):
    user = request
    if user.is_superuser or (user.type) == 'COMPANY' or (user.type) == 'STAFF':
        return True
    else:
        return False
user_per_required = user_passes_test(user_permission, login_url='account:NotPageFound')

def userper_login_required(view_func):
    decorated_view_func = login_required(user_per_required(view_func), login_url='/')
    return decorated_view_func