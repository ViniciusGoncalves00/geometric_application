from django.db import models
from django.core.validators import MinValueValidator

class Domain(models.Model):
    size_x = models.FloatField(validators=[MinValueValidator(0.0)], default=0)
    size_y = models.FloatField(validators=[MinValueValidator(0.0)], default=0)
    size_z = models.FloatField(validators=[MinValueValidator(0.0)], default=0)
    
    partitions_x = models.FloatField(validators=[MinValueValidator(0.0)], default=10)
    partitions_y = models.FloatField(validators=[MinValueValidator(0.0)], default=10)
    partitions_z = models.FloatField(validators=[MinValueValidator(0.0)], default=10)
    
    def minimum(self) -> tuple:
        return (-(self.size_x/2), -(self.size_y/2), -(self.size_z/2))
    
    def maximum(self) -> tuple:
        return (self.size_x/2, self.size_y/2, self.size_z/2)
    
    def serialize(self) -> dict:
        return {
            "size_x": self.size_x,
            "size_y": self.size_y,
            "size_z": self.size_z,
            "partitions_x": self.partitions_x,
            "partitions_y": self.partitions_y,
            "partitions_z": self.partitions_z,
        }
        
    class Meta:
        abstract = True