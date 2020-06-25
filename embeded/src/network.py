import subprocess
import time
# pour l'instant casse les couilles
#  nmcli device wifi list --> affiche les wifi
p = subprocess.Popen(['nmcli device wifi list'], stdout=subprocess.PIPE, shell=True)
#time.sleep(3)
result = p.communicate()
print(result)
#print(p.stdout.read())