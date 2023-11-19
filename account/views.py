from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login,logout
from django.http import HttpResponseRedirect
from .forms import (
    SignUpForm,
    LoginForm,
    UpdateUserCustomForm,
    CompanyForm,
    UpdateStaffForm,
    CompanyUpdateForm
)
from django.forms import ValidationError
from django.views.generic import View
from django.contrib import messages
from django.contrib.auth import get_user_model
from core.models import *
from django.views.generic import (
    TemplateView,
    DetailView,
    View,
    ListView,
    DetailView,
)
from .utils import *
from django.utils.decorators import method_decorator

User = get_user_model()

def NotPageFound(request):
    return render(request, '404.html')

class RegisterView(View):
    def get(self,request):
        form = SignUpForm(request.POST or None)
        company_form = CompanyForm(request.POST or None)
        return render(request, "account/register.html", {"form" : form, "company_form" : company_form })

    def post(self, request):
        msg     = None
        success = False
        if request.method == "POST":
            form = SignUpForm(request.POST)
            
            if form.is_valid():
                form.save()
                # group = Group.objects.get(name='client')
                username = form.cleaned_data.get("email")
                raw_password = form.cleaned_data.get("password1")
                user = authenticate(username=username, password=raw_password)
                # user.groups.add(group)

                # msg     = messages.add_message(request, messages.SUCCESS,'User created Successfully, Please Login!')
                success = True
                
                messages.success(request, "User Created Successfully * Please LogIn With Your Credential")
                return redirect("accounts:login")
            else:
                messages.warning(request, form.errors)
                msg = ('Form is not valid',)
                form.add_error(None,'Form is not valid')
        else:
            form = SignUpForm()
        return render(request, "account/register.html", {"form": form, "msg" : msg, "success" : success })
    
class LoginView(View):
    def get(self,request):
        if request.user.is_authenticated:
            return redirect("core:home")
        else:
            form = LoginForm(request.POST or None)
            return render(request, "account/login.html", {"form": form })

    def post(self,request):
        form = LoginForm(request.POST or None)

        msg = None
        if request.method == "POST":
            current_url = request.POST.get("current_url")
            print(current_url)

            if form.is_valid():
                email = form.cleaned_data.get("email")
                password = form.cleaned_data.get("password")
                user = authenticate(username=email, password=password)
                if user is not None:
                    
                    # login(request, user)
                    # if not user.is_superuser and not user.is_staff:
                    #     # user.is_staff = True
                    #     user.save()
                    # if not (user.is_superuser or user.groups.filter(name='admin').exists()) and user.groups.filter(name='client').exists():
                    #     # user.groups.add(Group.objects.get(name='client'))
                    #     user.save()
                    if user.is_superuser:
                        login(request, user)
                        messages.success(request, f"{ user.username } Is LogIn Successfully..! ")
                        return redirect("core:home")
                    elif user.type == "COMPANY" and user.is_status == True :
                        login(request, user)
                        messages.success(request, f"{ user.username } Is LogIn Successfully..! ")
                        return redirect("core:home")
                    elif user.type == "USER":
                        login(request, user)
                        messages.success(request, f"{ user.username } Is LogIn Successfully..! ")
                        if current_url == None:
                            return redirect("core:home")
                        else:
                            return redirect(current_url)
                    elif user.type == "STAFF":
                        login(request, user)
                        messages.success(request, f"{ user.username } Is LogIn Successfully..! ")
                        return redirect("core:home")
                    else:
                        messages.info(request,'Your Company Is Not Approved, Wait For It !')
                        pass
                    
                else:
                    messages.warning(request,'User name/Email and password does not match')
                    msg = ('User name/Email and password does not match',)
                    form.fields['email'].widget.attrs['class']="form-control is-invalid"
                    form.fields['password'].widget.attrs['class']="form-control is-invalid"
                    form.add_error("email",ValidationError(msg[0]))
            else:
                messages.warning(request, form.errors)
                msg = ('Please fill all the required fields',)
                form.add_error("email",ValidationError(msg[0]))

        return render(request, "account/login.html", {"form": form, "msg" : msg})
    
@method_decorator(login_required(login_url='/'), name='dispatch')
class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.success(request, "You Have Successfully Logout..")
        return redirect("/")
    
# FOR GET LIST OF ALL USER
@method_decorator(staff_login_required, name='dispatch')
class ListAllStaffView(TemplateView):

    def get(self,request):
        if request.user.is_superuser:
            users = User.objects.filter(type="STAFF")
        else:
            user = request.user.id
            users = User.objects.filter(type="STAFF" , created_by = user) 
        context={
            "users" : users
        }
        return render(request, "account/staff_list.html",context)


    def post(self,request):
        ...
    
    
@method_decorator(staff_login_required, name='dispatch')
class AddStaffView(TemplateView):

    def get(self,request):
        user = request.user
        init_data = {"type" : "STAFF","created_by":user.id}
        form = SignUpForm(initial=init_data)
        context={
            'form': form
        }
        return render(request, "account/staff_add.html", context)

    def post(self,request):
        user = request.user
        init_data = {"type" : "STAFF","created_by":user.id}
        form = SignUpForm(data = request.POST, initial=init_data)
        print(init_data)
        if form.is_valid():
            form.save()
            # return redirect(request, "app/dashboard.html")
            messages.success(request, f"Staff Added Successfully...")
            return redirect('account:staff-list')
        else:
            messages.warning(request, form.errors)
        context={
            'form': form
        }
        return render(request, "account/staff_add.html",context)

@method_decorator(staff_login_required, name='dispatch')
class UpdateStaff(View):

    def get(self,request,id):
        context = {}
        Update_staff= CustomUser.objects.get(pk=id)
        update_staff_form = UpdateStaffForm(instance=Update_staff)
        
        context['Update_staff_form'] = update_staff_form
        context['Update_user'] = Update_staff
        return render(request, 'account/staff_update.html', context)

    def post(self,request,id):
        context = {}
        if request.method == 'POST':
            Update_staff= CustomUser.objects.get(pk=id)
            update_staff_form = UpdateStaffForm(request.POST, instance=Update_staff)
            if update_staff_form.is_valid():
                update_staff_form.save()
                messages.success(request, f"{ Update_staff.username } SuccuessFully Updated...")
                return redirect('account:staff-list')
            else:
                messages.warning(request, update_staff_form.errors)
            context['Update_staff_form'] = update_staff_form
            context['Update_staff'] = Update_staff
        return render(request, 'account/staff_update.html', context)
    
@method_decorator(staff_login_required, name='dispatch')
class DeleteStaffPerson(View):
    
    def get(self, request, id):
        context = {}
        c_user = CustomUser.objects.get(pk=id)
        if c_user.delete():
            messages.success(request, f"{ c_user.username } is SuccessFully Deleted....")
            return redirect('account:staff-list')
        else:
            messages.warning(request, "Something wen't Wrong...!" )
        context['user'] = c_user
        return render(request, 'account/staff_list.html', context)
    
    def post(self, request):
        ...

@method_decorator(userper_login_required, name='dispatch')
class ListAllUserView(TemplateView):

    def get(self,request):
        if request.user.is_superuser:
            users = User.objects.filter(type="USER")
        else:
            user = request.user.id
            users = User.objects.filter(type="USER" , created_by = user) 
        context={
            "users" : users
        }
        
        return render(request, "account/user_list.html",context)

    def post(self,request):
        ...

@method_decorator(userper_login_required, name='dispatch')
class AddUserView(TemplateView):
    
    def get(self,request):
        user = request.user
        init_data = {"type" : "USER","created_by":user.id}
        form = SignUpForm(initial=init_data)
        context={
            'form': form
        }
        return render(request, "account/user_add.html", context)

    
    def post(self,request):
        user = request.user
        print(user) 
        init_data = {"type" : "USER","created_by":user.id}
        form = SignUpForm(data = request.POST, initial=init_data)
       
        if form.is_valid():
            form.save()
            messages.success(request, "User Added Successfully...")
            return redirect('account:user-list')
        else: 
            messages.warning(request, form.errors)

        context={
            'form': form
        }
        return render(request, "account/user_add.html",context)

@method_decorator(userper_login_required, name='dispatch')
class UpdateUserView(TemplateView):
    

    def get(self,request ,id):
        context = {}
        Update_user= CustomUser.objects.get(pk=id)
        
        update_user_form = UpdateUserCustomForm(instance=Update_user)
        
        context['update_user_form'] = update_user_form
        context['Update_user'] = Update_user
    
        return render(request, 'account/user_update.html', context) 

    def post(self , request, id):
        context = {}
    
        Update_user= CustomUser.objects.get(pk=id)
        update_user_form = UpdateUserCustomForm(request.POST, instance=Update_user)
        if update_user_form.is_valid():    
            update_user_form.save()
            messages.success(request, f"{ Update_user.username } SuccuessFully Updated...")
            return redirect('account:user-list')
        else:
            messages.warning(request, update_user_form.errors)
        context['update_user_form'] = update_user_form
        context['Update_user'] = Update_user
        return render(request, 'account/user_update.html', context)

@method_decorator(userper_login_required, name='dispatch')
class DeleteUserPerson(View):
    
    def get(self, request, id):
        context = {}
        c_user = CustomUser.objects.get(pk=id)
        if c_user.delete():
            messages.success(request, f"{ c_user.username } is SuccessFully Deleted....")
            return redirect('account:user-list')
        else:
            messages.warning(request, "Something wen't Wrong...!" )
        context['c_user'] = c_user
        return render(request, 'account/user_list.html', context)
    
    def post(self, request):
        ...

# @method_decorator(superuser_login_required, name='dispatch')
def UpdateStatusApproveView(request,id):
    record = User.objects.get(id = id)
    record.is_status = True
    record.save()
    messages.success(request, f"Company { record.username }'s Permission Is Approved !")
    return redirect('account:company-list')

# @method_decorator(superuser_login_required, name='dispatch')
def UpdateStatusRejectView(request,id):
    record = User.objects.get(id = id)
    record.is_status = False
    record.save()
    messages.success(request, f"Company { record.username }'s Permission Is Denied !")
    return redirect('account:company-list')


class CompanyRegisterView(View):
    def get(self,request):
        company_form = CompanyForm(request.POST or None)
        return render(request, "account/register.html", {"company_form" : company_form })
    
    def post(self, request):
        msg     = None
        success = False
        if request.method == "POST":
            company_form = CompanyForm(request.POST)
            if company_form.is_valid():
                company_form.save()
                # group = Group.objects.get(name='client')
                username = company_form.cleaned_data.get("email")
                raw_password = company_form.cleaned_data.get("password1")
                user = authenticate(username=username, password=raw_password)
                # user.groups.add(group)

                msg     = messages.add_message(request, messages.SUCCESS,'User created Successfully, Please Login!')
                success = True
                messages.success(request, "User Created Successfully * Please LogIn With Your Credential")
                return redirect("accounts:login")
            else:
                messages.warning(request, company_form.errors)
                msg = ('Form is not valid',)
                company_form.add_error(None,'Form is not valid')
        else:
            company_form = SignUpForm()
        return render(request, "account/register.html", {"company_form": company_form, "msg" : msg, "success" : success })


@method_decorator(superuser_login_required, name='dispatch')
class AddCompanyView(TemplateView):
    
    def get(self,request):
        user = request.user
        init_data = {"type" : "COMPANY","created_by":user.id}
        form = CompanyForm(initial=init_data)
        context={
            'form': form
        }
        return render(request, "account/company_add.html", context)

    
    def post(self,request):
        user = request.user
        print(user) 
        init_data = {"type" : "COMPANY","created_by":user.id}
        form = CompanyForm(data = request.POST, initial=init_data)
       
        if form.is_valid():
            form.save()
            messages.success(request, "Company Added Successfully...")
            return redirect('account:company-list')
        else:
            messages.warning(request, form.errors)

        context={
            'form': form
        }
        return render(request, "account/company_add.html",context)

@method_decorator(superuser_login_required, name='dispatch')
class DeleteCompany(View):
    
    def get(self, request, id):
        context = {}
        c_user = CustomUser.objects.get(pk=id)
        if c_user.delete():
            messages.success(request, f"{ c_user.username } is SuccessFully Deleted....")
            return redirect('account:company-list')
        else:
            messages.warning(request, "Something wen't Wrong...!" )
        context['c_user'] = c_user
        return render(request, 'account/company_list.html', context)
    
    def post(self, request):
        ...

@method_decorator(superuser_login_required, name='dispatch')
class CompanyListView(View):
    def get(self,request):
        
        users = Company.objects.all()
        context={
        "users" : users
        } 
        return render(request, "account/company_list.html", context)
    
@method_decorator(superuser_login_required, name='dispatch')
class UpdateCompanyView(TemplateView):
    

    def get(self,request ,id):
        context = {}
        Update_Company= Company.objects.get(pk=id)
        
        update_company_form = CompanyUpdateForm(instance=Update_Company)
        
        context['update_company_form'] = update_company_form
        context['Update_Company'] = Update_Company
    
        return render(request, 'account/company_update.html', context) 

    def post(self , request, id):
        context = {}
    
        Update_Company= Company.objects.get(pk=id)
        update_company_form = CompanyUpdateForm(request.POST, instance=Update_Company)
        if update_company_form.is_valid():    
            update_company_form.save()
            messages.success(request, f"{ Update_Company.username } SuccuessFully Updated...")
            return redirect('account:company-list')
        else:
            messages.warning(request, update_company_form.errors)
        context['update_company_form'] = update_company_form
        context['Update_Company'] = Update_Company
        return render(request, 'account/company_update.html', context)