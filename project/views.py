from django.shortcuts import render
from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import View
from project import models

class main(View):
    template_name = "index.html"
    
    def get(self, request : HttpRequest):
        object = models.ThreeCube.objects.first()
        if object:
            data = {
                "name": object.name,
                "position_x": object.position_x,
                "position_y": object.position_y,
                "position_z": object.position_z,
                "rotation_x": object.rotation_x,
                "rotation_y": object.rotation_y,
                "rotation_z": object.rotation_z,
                "scale_x": object.scale_x,
                "scale_y": object.scale_y,
                "scale_z": object.scale_z,
            }
        return render(request, self.template_name, {"cube_data": data})
    
# def get_objects_from_db(self):
#     try:
#         object = models.ThreeCube.objects.first()
#         if object:
#             data = {
#                 "name": object.name,
#                 "position_x": object.position_x,
#                 "position_y": object.position_y,
#                 "position_z": object.position_z,
#                 "rotation_x": object.rotation_x,
#                 "rotation_y": object.rotation_y,
#                 "rotation_z": object.rotation_z,
#                 "scale_x": object.scale_x,
#                 "scale_y": object.scale_y,
#                 "scale_z": object.scale_z,
#             }
#             return JsonResponse(data)
#         else:
#             return JsonResponse({"error": ""}, status=404)
#     except Exception as e:
#         print(f"Error in get_objects_from_db: {str(e)}")
#         return JsonResponse({"error": str(e)}, status=500)