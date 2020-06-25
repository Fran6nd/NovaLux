import requests
import json


resp = requests.get("http://localhost:3000/update")
if resp.ok and resp.status_code == 200:   
   print(resp.text)
else:
    print('error')


