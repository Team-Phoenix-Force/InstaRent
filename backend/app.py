from flask import Flask, jsonify, request
from pymongo import MongoClient

from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

app = Flask(__name__)
try:
    client = MongoClient("mongodb+srv://rameshbabu:ramesh208@cluster0.oeanppb.mongodb.net/InstaRent?retryWrites=true&w=majority&appName=Cluster0")
    db = client["InstaRent"]
    collection = db["products"]
    print("Successfully connected to MongoDB Cloud database")
except Exception as e:
    print("Error connecting to MongoDB Cloud database:", e)


def get_product_texts():
    products = collection.find({})
    objects = []
    for product in products:
        objects.append(product)
    return products

@app.route('/input', methods=['POST'])
def recommend_products():
    data = request.json
    search_keyword = data['product']
    objects = get_product_texts()

    search_keyword_embedding = model.encode(search_keyword, convert_to_tensor=True)

    for obj in objects:
        obj_embedding = model.encode(obj["title"] + " " + obj["description"], convert_to_tensor=True)
        
        similarity_score = util.pytorch_cos_sim(search_keyword_embedding, obj_embedding)
        obj["similarity_score"] = similarity_score.item()

    filtered_objects = sorted(objects, key=lambda x: x["similarity_score"], reverse=True)

    print(filtered_objects)

if __name__ == '__main__':
    app.run(debug=True)