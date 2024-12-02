import json
from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.generic import View
from project import models

# class Main(View):
#     template_name = "index.html"
    
#     def get(self, request: HttpRequest):
#         objects = models.ThreeCube.objects.all()

#         data = []
#         for object in objects:
#             data.append({
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
#             })
        
#         return render(request, self.template_name, {"objects": data})
    
#     def put(self, request: HttpRequest):
#         try:
#             data = json.loads(request.body)
#             items = [models.ThreeCube]
            
#             for object_data in data:
#                 item, created = models.ThreeCube.objects.update_or_create(
#                     name=object_data["name"],
#                     defaults={
#                         "position_x": object_data["position_x"],
#                         "position_y": object_data["position_y"],
#                         "position_z": object_data["position_z"],
#                         "rotation_x": object_data["rotation_x"],
#                         "rotation_y": object_data["rotation_y"],
#                         "rotation_z": object_data["rotation_z"],
#                         "scale_x": object_data["scale_x"],
#                         "scale_y": object_data["scale_y"],
#                         "scale_z": object_data["scale_z"],
#                     }
#                 )
#                 items.append(item)

#             return render(request, self.template_name, items)
#         except Exception as e:
#             return render(request, self.template_name, items)

class Main(View):
    template_name = "index.html"
    
    def get(self, request):
        return render(request, self.template_name)
    
class CubeListView(View):
    template_name = "cube_list.html"
    
    def context(self) -> dict: 
        cubes = models.ThreeCube.objects.all()
        return {"object_data":[cube.serialize_object() for cube in cubes]}
    
    def get(self, request: HttpRequest) -> HttpResponse:
        return render(request, self.template_name, self.context())
    
    def post(self, request, *args, **kwargs) -> HttpResponse:
        context = self.context()
        try:
            data = json.loads(request.body)
            
            if not isinstance(data, list):
                # return render(request, self.template_name, context)
                return JsonResponse({"error": "Invalid data format. Expected a list of objects."}, status=400)

            for object_data in data:
                models.ThreeCube.objects.update_or_create(
                    name=object_data["name"],
                    defaults=
                    {
                        "position_x": object_data["position_x"],
                        "position_y": object_data["position_y"],
                        "position_z": object_data["position_z"],
                        "rotation_x": object_data["rotation_x"],
                        "rotation_y": object_data["rotation_y"],
                        "rotation_z": object_data["rotation_z"],
                        "scale_x": object_data["scale_x"],
                        "scale_y": object_data["scale_y"],
                        "scale_z": object_data["scale_z"],
                    }
                )

            # return render(request, self.template_name, context)
            return JsonResponse({"message": "Objects saved successfully."}, status=200)
        except Exception as e:
            # return render(request, self.template_name, context)
            return JsonResponse({"error": str(e)}, status=500)
        
    def delete(self, request, *args, **kwargs) -> HttpResponse:
        models.ThreeCube.objects.all().delete()
        print(models.ThreeCube.objects.all())
        return JsonResponse({"message": "Objects deleted successfully."}, status=200)