#!/usr/bin/env python
import kivy
from kivy.app import App
from kivy.core.window import Window
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.anchorlayout import AnchorLayout
from kivy.uix.gridlayout import GridLayout
from kivy.graphics import Rectangle, Color
from kivy.uix.screenmanager import ScreenManager, Screen
class MyLayout(AnchorLayout, Screen):
    def checkLamp():
        print("test print")
    pass

class Configuration(GridLayout ,AnchorLayout,Screen):
    pass

class Information(GridLayout,Screen):
    pass
class Wifi(GridLayout,Screen):
    pass

class AddWifi(GridLayout,Screen):
    #créer un tableau dynamique qui affiche les wifi dispo
    def checkWifi(self):
        print("check wifi")
    pass

class MyScreenManager(ScreenManager):
    pass

class DeviceManager(GridLayout, Screen):
    pass

class AddVirilux(GridLayout, Screen):
    pass
class AddDevice(GridLayout, Screen):
    pass

class myApp(App):  
    def build(self):
        Window.size=(480,800)# taille de l'ecran
        screen_manager= ScreenManager()
        screen_manager.add_widget(MyLayout(name ="mainScreen"))
        screen_manager.add_widget(Configuration(name="configScreen"))
        screen_manager.add_widget(Information(name="InfoScreen"))
        screen_manager.add_widget(Wifi(name="WifiScreen"))
        screen_manager.add_widget(AddWifi(name="AddWifiScreen"))
        screen_manager.add_widget(DeviceManager(name="DeviceManageScreen"))
        screen_manager.add_widget(AddVirilux(name="AddViriluxScreen"))
        screen_manager.add_widget(AddDevice(name="AddDeviceScreen"))

if __name__ == '__main__':
    myApp().run()

