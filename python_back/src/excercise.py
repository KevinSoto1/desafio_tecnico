import numpy as np
import pandas as pd
from sklearn import linear_model
from sklearn import model_selection
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score , mean_squared_error



def prediction(age, sex, bmi, children, smoker, region):
    #Se crea el dataframe para leer el archivo csv
    df = pd.read_csv('./insurance.csv')
    #Se cambian los valores que están como strings a númericos
    le = LabelEncoder()
    df['sex'] = le.fit_transform(df['sex'])
    df['smoker'] = le.fit_transform(df['smoker'])
    print(df['region'])
    df['region'] = le.fit_transform(df['region'])
    print(df['region'])
    df['charges'] = le.fit_transform(df['charges'])
    #Se crean las variables x e y, donde x son todas las columnas excepto la columna "charges" e y es la columna "charges"
    x = df.iloc[ : , : -1]
    y = df.iloc[ : , -1]
    #Se crea el modelo logístico y se lo entrena
    model = linear_model.LogisticRegression(max_iter=100000)
    size_valid=0.2
    seed=100
    x_train, x_test, y_train, y_test = model_selection.train_test_split(x, y, test_size = size_valid, random_state=seed)
    model.fit(x_train,y_train)
    predictions=model.predict(x_test)
    score = r2_score(y_test , predictions)
    #Se ingresan los datos para predecir los cargos manuales
    x_new = pd.DataFrame({'age': [age], 'sex': [sex], 'bmi': [bmi], 'children': [children], 'smoker': [smoker], 'region': [region]})
    new_pred=model.predict(x_new)
    #Se revierten los datos que se predijeron al formato adicional
    new_pred=le.inverse_transform(new_pred)
    return (new_pred)
