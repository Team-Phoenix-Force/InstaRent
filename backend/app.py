import os
from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from dotenv import load_dotenv

app = Flask(__name__)
try:
    load_dotenv()
    ATLAS_URI = os.getenv("ATLAS_URI")
    client = MongoClient(ATLAS_URI)
    db = client["InstaRent"]
    collection = db["products"]
    print("Successfully connected to MongoDB Cloud database")
except Exception as e:
    print("Error connecting to MongoDB Cloud database:", e)

vectorizer = TfidfVectorizer()

def get_product_texts():
    products = list(collection.find({}, {"_id": 0}))
    product_texts = [(product, product['title'] + ' ' + product['description']) for product in products]
    return product_texts

def fit_tfidf_matrix(product_texts):
    tfidf_matrix = vectorizer.fit_transform(product_texts)
    return tfidf_matrix

def find_similar_products(input_text, tfidf_matrix, product_texts):
    input_vector = vectorizer.transform([input_text])
    similarities = cosine_similarity(input_vector, tfidf_matrix)
    sorted_indices = similarities.argsort()[0][::-1]
    similar_products = [(product_texts[idx][0]) for idx in sorted_indices]
    return similar_products

@app.route('/input', methods=['POST'])
def recommend_products():
    data = request.json
    input_product = data['product']
    product_texts = get_product_texts()
    tfidf_matrix = fit_tfidf_matrix(product_texts)
    similar_products = find_similar_products(input_product, tfidf_matrix, product_texts)  
    return jsonify(similar_products)

if __name__ == '_main_':
    app.run(debug=True)