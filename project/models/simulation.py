from django.db import models
from domain import Domain

class Simulation(models.Model):
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE)