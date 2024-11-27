# from django.core.management.base import BaseCommand
# import requests

# class Command(BaseCommand):
#     help = "Consume the ThreeCube API and save data to the database"

#     def handle(self, *args, **kwargs):
#         url = "http://localhost:8000/three-cubes/"
#         response = requests.get(url)
#         if response.status_code == 200:
#             data = response.json()
#             # Processar os dados aqui
#             self.stdout.write(f"Data fetched successfully: {data}")
#         else:
#             self.stderr.write(f"Failed to fetch data: {response.status_code}")