from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from excercise import prediction
import datetime

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'test_db'
app.config['MONGO_URI'] = 'mongodb+srv://user1:wea1234@cluster0.nnrhk.mongodb.net/test_db?retryWrites=true&w=majority'
mongo = PyMongo(app)

@app.route('/datalog', methods=['GET'])
def get_all():
    datalog = mongo.db.datalog
    data=[]
    for p in datalog.find():
        data.append({
        'creation_time': p['creation_time'],
        'age': p['age'],
        'sex': p['sex'],
        'bmi': p['bmi'],
        'children': p['children'],
        'smoker': p['smoker'],
        'region': p['region'],
        'charge': p['charge'],
        'id': str(p['_id'])
        })
    return jsonify(data)

@app.route('/new_pred', methods=['POST'])
def new_prediction():
    sextemp=0
    smokertemp=0
    regiontemp=0
    datalog=mongo.db.datalog
    age = request.json['age']
    sex = request.json['sex']
    bmi = request.json['bmi']
    children = request.json['children']
    smoker = request.json['smoker']
    region = request.json['region']

    if(sex=='female'):
        sextemp = 0
    elif(sex=='male'):
        sextemp = 1

    if(smoker=='no'):
        smokertemp = 0
    elif(smoker=='yes'):
        smokertemp = 1
    
    if(region=='northeast'):
        regiontemp = 0
    elif(region=='northwest'):
        regiontemp = 1
    elif(region=='southeast'):
        regiontemp = 2
    elif(region=='southwest'):
        regiontemp = 3
    
    charge = prediction(age,sextemp,bmi,children,smokertemp,regiontemp)
    charge = charge.tolist()
    post_data ={
        'creation_time': datetime.datetime.utcnow(),
        'age': age,
        'sex': sex,
        'bmi': bmi,
        'children': children,
        'smoker': smoker,
        'region': region,
        'charge': charge
    }
    datalog.insert_one(post_data)
    return jsonify({'result': charge})

@app.route('/test')
def test():
    return "App is working perfectly"

if __name__ == "__main__":
    app.run(debug=True)