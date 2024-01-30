from django.db import models

# Create your models here.

class Info(models.Model):
    name_text = models.CharField(max_length=500)
    nick_text = models.CharField(max_length=500)
    department_text =models.CharField(max_length=500)
    phone_number=models.CharField(max_length=20)
    building_number=models.IntegerField()
    room_number=models.IntegerField()
    photo= models.ImageField(upload_to='image/')
    
     
   


