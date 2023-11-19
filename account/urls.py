from django.urls import path
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('', LoginView.as_view(), name="login"),
    path('register/', RegisterView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(), name="logout"),
    
    path('staff-list/',ListAllStaffView.as_view(), name='staff-list'),
    path('staff-add/',AddStaffView.as_view(), name='staff-add'),
    path('staff-update/<int:id>/',UpdateStaff.as_view(), name='staff-update'),
    path('staff-delete/<int:id>/',DeleteStaffPerson.as_view(), name='staff-delete'),
    
    path('user-list/',ListAllUserView.as_view(), name='user-list'),
    path('user-add/',AddUserView.as_view(), name='user-add'),
    path('user-update/<int:id>/',UpdateUserView.as_view(), name='user-update'),
    path('user-delete/<int:id>/',DeleteUserPerson.as_view(), name='user-delete'),
    
    path('company-list/', CompanyListView.as_view(), name="company-list"),
    path('company-add/', AddCompanyView.as_view(), name="company-add"),
    path('company-update/<int:id>/', UpdateCompanyView.as_view(), name="company-update"),
    path('company-delete/<int:id>/',DeleteCompany.as_view(), name='company-delete'),
    # path('companypanel/',CompanypanelView.as_view(), name='companypanel'),
    path('update-status-approve/<int:id>/',UpdateStatusApproveView, name='update-status-approve'),
    path('update-status-reject/<int:id>/',UpdateStatusRejectView, name='update-status-reject'),
    path('company_register/', CompanyRegisterView.as_view(), name="company_register"),
    
    path("NotPageFound", NotPageFound ,name="NotPageFound"),
] 
