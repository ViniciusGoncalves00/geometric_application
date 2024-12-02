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

    def serialize_object(self):
        return {
            "name": self.name,
            "position_x": self.position_x,
            "position_y": self.position_y,
            "position_z": self.position_z,
            "rotation_x": self.rotation_x,
            "rotation_y": self.rotation_y,
            "rotation_z": self.rotation_z,
            "scale_x": self.scale_x,
            "scale_y": self.scale_y,
            "scale_z": self.scale_z,
        }

    class Meta:
        abstract = False
