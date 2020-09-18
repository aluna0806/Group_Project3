from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo

# Create connection variable
conn = 'mongodb://localhost:27017'
​
# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)
​
# Connect to a database. Will create one if not already available.
db = client.yelp_db
​
# Create an instance of our Flask app.
app = Flask(__name__)
​
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
​
# # Set route
# @app.route('/')
# def index():
#     return "please visit the api routes"
​
@app.route('/api/city_cuisine')
@cross_origin()
def city_cuisine():
    cs_info = [doc for doc in db.yelp_db.find({}, {'_id': False})]
    cs_info_format = {"data": cs_info[0]}
    # print(cs_info)
    return jsonify(cs_info_format)
​
@app.route('/api/yelp_Citiescount')
@cross_origin()
def city_count():
    cs_status = [doc for doc in db.yelp_db.find({}, {'_id': False})]
    cs_status_format = {"data": cs_status[0]}
    return jsonify(cs_status_format)
​
@app.route('/api/city_facts')
@cross_origin()
def city_facts():
    cs_status = [doc for doc in db.yelp_db.find({}, {'_id': False})]
    cs_status_format = {"data": cs_status[0]}
    return jsonify(cs_status_format)

if __name__ == "__main__":
    app.run(debug=True)