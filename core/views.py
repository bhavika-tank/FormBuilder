from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from account.forms import LoginForm
from core.models import *
from django.contrib import messages
from django.views.generic import TemplateView,View
import uuid
import json
import png
import pyshorteners
import pyqrcode

User = get_user_model()

def HomeView(request):
    context={}
    user = request.user.id
    
    context['approvedcompanies'] = Company.objects.all().filter(is_status = True).count()
    context['pendingapprovecompanies'] = Company.objects.all().filter(is_status = False).count()
    context['total_staff'] = User.objects.all().filter(type = "STAFF").count()
    context['total_user'] = User.objects.all().filter(type = "USER").count()
    context['company_user'] = User.objects.all().filter(type="USER" , created_by = user).count()
    context['company_staff'] = User.objects.all().filter(type="STAFF" , created_by = user).count()
    context['staff_user'] = User.objects.all().filter(type="USER" , created_by = user).count()
    context['form'] = FormAttributes.objects.all().count()
    context['user_form'] = FormAttributes.objects.all().filter(user = user).count()
    print(context)
    return render(request,'core/home.html',context)
    
    
def BuildFormView(request, *args, **kwargs):
    return render(request, 'core/Build_form.html')

def saveForm(request, *args, **kwargs):

    user = request.user

    random_uuid = uuid.uuid4()

    link_shorter = pyshorteners.Shortener()
    generated_link = link_shorter.tinyurl.short(f"127.0.0.1:8000/core/form/{random_uuid}")

    # print("Generated link: ", generated_link)
    url = pyqrcode.create(generated_link)
    
    generated_qrcode = url.png_as_base64_str(scale=5)

    context = {
        "attribute":request.POST['tab_list'],
        "form_name" : request.POST['formname'],
    }
    
    Attributes = FormAttributes(
        user = user,
        form_uid = random_uuid,
        form_name = context['form_name'],
        form_link = generated_link,
        form_qrcode = generated_qrcode,
        attributes = context['attribute'],
    )
    
    if Attributes:
        Attributes.save()
        messages.success(request, "Save form attributes successfully...")
    else:
        messages.error(request, "Somethings want wrong...")

    # context["messages"] = messages
    return JsonResponse(context, safe=True)

def saveFormData(request, *args, **kwargs):

    user = request.user
    if user.is_authenticated:
        context = {
            "attribute":request.POST['tab_list'], 
            "uuid":request.POST['uuId'],
            "form_name": request.POST['form_name'],
        }
        form_attributes = get_object_or_404(FormAttributes, form_uid= context['uuid'])

        Attributes = FormValues(
            user = user,
            FormID = form_attributes,
            FormName = context['form_name'],
            FormValue = context['attribute']
        )
        if Attributes:
            Attributes.save()
            messages.success(request, "Save form attributes successfully...")
        else:
            messages.error(request, "Somethings want wrong...")

        return JsonResponse(context, safe=True)
    else:
        context = {
            "attribute":request.POST['tab_list'], 
            "uuid":request.POST['uuId'],
            "form_name": request.POST['form_name'],
        }
        form_attributes = get_object_or_404(FormAttributes, form_uid= context['uuid'])

        Attributes = FormValues(
            FormID = form_attributes,
            FormName = context['form_name'],
            FormValue = context['attribute']
        )
        if Attributes:
            Attributes.save()
            messages.success(request, "Save form attributes successfully...")
        else:
            messages.error(request, "Somethings want wrong...")

        return JsonResponse(context, safe=True)


def generate_random_link(request, form_uid):

    context  = {}
    
    form = LoginForm(request.POST or None)
    
    form_data = FormAttributes.objects.get(form_uid=form_uid)
    print(form_data.form_link)

    form_uuid = form_data.form_uid
    data = eval(form_data.attributes)
    
    json_string = json.dumps(data, indent=4)

    context['uuid'] = form_uuid
    context['attribute'] = json_string
    context['form_data'] = form_data
    context['form'] = form

    return render(request, 'core/Fill_form.html', context)

class DeletePublishedForm(View):
    
    def get(self, request, id):
        context = {}
        published_form = FormAttributes.objects.get(pk=id)
        if published_form.delete():
            messages.success(request,"Form SuccessFully Deleted....")
            return redirect('core:published_form')
        else:
            messages.warning(request, "Something wen't Wrong...!" )
        context['published_form'] = published_form
        return render(request, 'core/published_form.html', context)
    
    def post(self, request):
        ...
        
class DeleteFilledForm(View):
    
    def get(self, request, id):
        context = {}
        value_form = FormValues.objects.get(pk=id)
        if value_form.delete():
            messages.success(request,"Form SuccessFully Deleted....")
            return redirect('core:Filledform_list')
        else:
            messages.warning(request, "Something wen't Wrong...!" )
        context['value_form'] = value_form
        return render(request, 'core/Filledform_list.html', context)
    
    def post(self, request):
        ...

class PublishFormView(TemplateView):

    def get(self,request):
        if request.user.is_superuser:
            users = FormAttributes.objects.all()
        else:
            user = request.user.id
            users = FormAttributes.objects.filter(user = user) 
        context={
            "users" : users
        }
        return render(request, "core/published_form.html",context)

class FilledFormListView(TemplateView):

    def get(self,request):
        user = request.user
        if request.user.is_superuser:
            fm_value = FormValues.objects.all()
        elif user.type == "COMPANY":
            cmp_users = CustomUser.objects.filter(created_by=user.id, type="USER")
            fm_value = FormValues.objects.filter(user__in=cmp_users)
            print(fm_value)
        elif user.type == "STAFF":
            cmp_users = CustomUser.objects.filter(created_by=user.id, type="USER")
            fm_value = FormValues.objects.filter(user__in=cmp_users)
            print(fm_value)
            
        else:
            fm_value = FormValues.objects.filter(user = user) 
        
        context={
            "fm_value" : fm_value
        }
        return render(request, "core/Filledform_list.html", context)
    
    def post(self, request):
        ...