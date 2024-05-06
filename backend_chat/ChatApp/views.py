import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.db.models import Q
from .models import Message
# from pymongo import MongoClient
# from sentence_transformers import SentenceTransformer, util

# model = SentenceTransformer('all-MiniLM-L6-v2')

# try:
#     client = MongoClient("mongodb+srv://rameshbabu:ramesh208@cluster0.oeanppb.mongodb.net/InstaRent?retryWrites=true&w=majority&appName=Cluster0")
#     db = client["InstaRent"]
#     collection = db["products"]
#     print("Successfully connected to MongoDB Cloud database")
# except Exception as e:
#     print("Error connecting to MongoDB Cloud database:", e)

# def get_product_texts():
#     products = collection.find({})
#     return products

# products = get_product_texts()
# objects = []
# for product in products:
#   objects.append(product)

# # Calculating co-ordinates for each city
# from geopy.geocoders import Nominatim
# from geopy.distance import geodesic

# def get_coordinates(city_name):
#     geolocator = Nominatim(user_agent="city_distance_calculator")
#     location = geolocator.geocode(city_name)
#     if location:
#         return location.latitude, location.longitude
#     else:
#         print(f"Could not find coordinates for {city_name}")
#         return None

# city_coords = {}
# for obj in objects:
#     try:
#       lat, lon = get_coordinates(obj["city"])
#       city_coords[obj["city"].lower()] = (lat, lon)
#     # except and print error
#     except Exception as e:
#       print(e)
#       print(obj)

# def calculate_distance(city1, city2):
#     try:
#       coords1 = city_coords.get(city1.lower())
#       coords2 = city_coords.get(city2.lower())
#     except:
#       coords1 = get_coordinates(city1.lower())
#       coords2 = get_coordinates(city2.lower())
#     if coords1 and coords2:
#         distance = geodesic(coords1, coords2).kilometers
#         return distance
#     else:
#         return float('inf')

def MessageView(request, username):
    try:
        messages = Message.objects.filter(Q(sender=username) | Q(receiver=username))

        other_users = set()
        for message in messages:
            if message.sender != username:
                other_users.add(message.sender)
            if message.receiver != username:
                other_users.add(message.receiver)

        if messages.exists():
            return JsonResponse({
                "other_users": list(other_users)
            })
        else:
            return JsonResponse({"message": "No messages for the user"})
        
    except:
        return JsonResponse({"error": "An error occurred"})


def ChatView(request, mainUser, otherUser):
    try:
        messages = Message.objects.filter(
            Q(sender=mainUser, receiver=otherUser) | Q(sender=otherUser, receiver=mainUser)
        )

        if messages.exists():
            return JsonResponse({"messages": list(messages.values())})
        else:
            return JsonResponse({"message": "No messages between the users"})
        
    except:
        return JsonResponse({"error": "An error occurred"})


@csrf_exempt
def SendMessage(request, sender, receiver):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            message = data.get('message')

            new_message = Message.objects.create(sender=sender, receiver=receiver, message=message)
            
            return JsonResponse({"message": "Message sent successfully"})
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        
    else:
        return JsonResponse({"message": "This endpoint only accepts POST requests"}, status=405)
    
# def SearchView(request):
#     data = json.loads(request.body)
#     search_keyword = data.get('searchedText')
#     search_city = data.get('userCity')

#     search_keyword_embedding = model.encode(search_keyword, convert_to_tensor=True)

#     for obj in objects:
#         obj_embedding = model.encode(obj["title"] + " " + obj["description"], convert_to_tensor=True)
        
#         similarity_score = util.pytorch_cos_sim(search_keyword_embedding, obj_embedding)
#         obj["similarity_score"] = similarity_score.item()

#     threshold = 0.2
#     filtered_objects = [obj for obj in objects if obj["similarity_score"] >= threshold]

#     filtered_objects = sorted(filtered_objects, key=lambda x: calculate_distance(search_city, x["city"]), reverse=False)
#     for obj in filtered_objects:
#         if '_id' in obj:
#             obj['_id'] = str(obj['_id'])

#     return JsonResponse(filtered_objects, safe=False)
        