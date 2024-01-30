"""
URL configuration for nsu_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path
from nsuapp import views
from rest_framework.urlpatterns import  format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
# from django.conf.urls import url
from django.urls import include, re_path




urlpatterns = [
    path("", views.index),
    path('admin/', admin.site.urls),
    path('info/', (views.info_list)),
    path('info/<int:id>', (views.info_detail)),
    re_path(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),
    
   
]


    

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_URL)





