import requests
import json



def learnJSON():
    with open('update.json') as json_data:
        data_version = json.load(json_data)
        #print(data_version)
        # affiche la version du l'app
        Version = data_version['version']
        print(Version)
        
def reqUpdate():
    header = "json à mettre"
    resp = requests.get("http://localhost:3000/update")
    if resp.ok and resp.status_code == 200:   
        print(resp.text)
    else:
        print('error')


learnJSON()