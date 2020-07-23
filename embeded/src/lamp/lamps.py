import subprocess
import time
import re

def checkLamp():

    expression_data = re.compile(r'((?:[0-9]{1,3}\.){3}[0-9]{1,3}) - ([a-zA-Z0-9]*)')
    countLamp = 0
    process=subprocess.Popen(['timeout' ,'10', 'tplight', 'scan'], stdout=subprocess.PIPE)
    out,err = process.communicate()
    out = out.decode('ISO-8859-1')
    #resultlamp = 'Press Ctrl-C to stop\n192.168.1.18 - LightBulb001 - LB130(EU)\n192.168.1.19 - LightBulb01 - LB10(EU)\n'
    resultlamp= out
    listeLamp = expression_data.findall(resultlamp)
    print(listeLamp)
    for dataa in listeLamp:
        print(dataa[0])
        countLamp = countLamp +1

    print('nombre de lampe: ' + str(countLamp))

checkLamp()