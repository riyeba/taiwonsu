from logging import info
from django.shortcuts import render
from django.http import JsonResponse
from .models import Info
from .serializers import InfoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from django.http import HttpResponse
# from django.shortcuts import redirect

# Create your views here.



@api_view(['GET', 'POST'])
@permission_classes([AllowAny,])
def info_list(request, format=None):
      
    if request.method =='GET':
       info=Info.objects.all()
       serializer=InfoSerializer(info, many=True)
       return Response(serializer.data)
     
    if request.method=='POST':
       serializer=InfoSerializer(data=request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
       else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
     
   
@api_view(['GET', 'PUT','DELETE'])
def info_detail(request,id,format=None):
    
    try:
       info= Info.objects.get(pk=id)
    except Info.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method=='GET':
       serializer= InfoSerializer(info)
       return Response(serializer.data)
        
    elif request.method=='PUT':
        serializer= InfoSerializer(info,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        
    elif request.method=='DELETE':
        if info.photo:
           info.photo.delete()
        info.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
   
@api_view(['GET', 'PUT','DELETE'])
def index(request):
    return HttpResponse("You're looking at question %s." )