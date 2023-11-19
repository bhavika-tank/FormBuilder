from django.urls import path
from django.conf.urls.static import static
from Form_Builder import settings
from .views import *

urlpatterns = [
    path('', HomeView, name='home'),
    path('BuildForm/', BuildFormView, name='BuildForm'),
    path('saveForm/', saveForm, name='saveForm'),
    path('saveFormData/', saveFormData, name='saveFormData'),
    path('form/<str:form_uid>', generate_random_link, name='linkgenerator'),
    path('published_form/', PublishFormView.as_view(), name="published_form"),
    path('filledform_list/', FilledFormListView.as_view(), name="filledform_list"),
    path('publishedform_delete/<int:id>/', DeletePublishedForm.as_view(), name="publishedform_delete"),
    path('filledform_delete/<int:id>/', DeleteFilledForm.as_view(), name="filledform_delete"),
    
] 
