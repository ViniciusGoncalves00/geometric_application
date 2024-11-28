from typing import Any
from django.db import models

# Create your models here.
class ThreeCube(models.Model):
    name = models.CharField(max_length=50)
    
    position_x = models.FloatField(default=0)
    position_y = models.FloatField(default=0)
    position_z = models.FloatField(default=0)
    
    rotation_x = models.FloatField(default=0)
    rotation_y = models.FloatField(default=0)
    rotation_z = models.FloatField(default=0)
    
    scale_x = models.FloatField(default=1)
    scale_y = models.FloatField(default=1)
    scale_z = models.FloatField(default=1)
    
    class Meta:
        abstract = False