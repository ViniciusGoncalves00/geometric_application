from typing import Any
from django.db import models

# Create your models here.
class ThreeCube(models.Model):
    name = models.CharField(max_length=50)
    
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    
    rotation_x = models.FloatField()
    rotation_y = models.FloatField()
    rotation_z = models.FloatField()
    
    scale_x = models.FloatField()
    scale_y = models.FloatField()
    scale_z = models.FloatField()
    
    class Meta:
        abstract = False