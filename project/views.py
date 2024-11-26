from django.shortcuts import render
from django.http import HttpRequest
from django.views.generic import View

class main(View):
    template_name = "index.html"
    
    def get(self, request : HttpRequest):
        return render(request, self.template_name)