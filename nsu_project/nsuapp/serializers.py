from rest_framework import serializers
from .models import Info



class InfoSerializer(serializers.ModelSerializer):
  class Meta:
    model=Info
    fields=['id','name_text','nick_text','department_text','phone_number','building_number','room_number','photo',]
    
  