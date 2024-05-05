from flask import Flask, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

app = Flask(__name__)
try:
    client = MongoClient("mongodb+srv://rameshbabu:ramesh208@cluster0.oeanppb.mongodb.net/InstaRent?retryWrites=true&w=majority&appName=Cluster0")
    db = client["InstaRent"]
    collection = db["products"]
    print("Successfully connected to MongoDB Cloud database")
except Exception as e:
    print("Error connecting to MongoDB Cloud database:", e)

vectorizer = TfidfVectorizer()

def get_product_texts():
    products = collection.find({}, {"_id": 0, "title": 1, "description": 1})
    product_texts = [product['title'] + ' ' + product['description'] for product in products]
    return product_texts

def fit_tfidf_matrix(product_texts):
    tfidf_matrix = vectorizer.fit_transform(product_texts)
    return tfidf_matrix

def find_similar_products(input_text, tfidf_matrix, product_texts):
    input_vector = vectorizer.transform([input_text])
    similarities = cosine_similarity(input_vector, tfidf_matrix)
    sorted_indices = similarities.argsort()[0][::-1]
    similar_products = [(product_texts[idx]) for idx in sorted_indices]  
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