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
        print("texttttte")
    pass

class Configuration(GridLayout ,AnchorLayout,Screen):
    pass

class Information(GridLayout,Screen):
    pass
class Wifi(GridLayout,Screen):
    pass

class AddWifi(GridLayout,Screen):
    pass

class MyScreenManager(ScreenManager):
    pass
class myApp(App):  
#the kv file name will be Tutorial (name is before the "App")
    def build(self):
        Window.size=(480,800)# taille de l'ecran
        screen_manager= ScreenManager()
        screen_manager.add_widget(MyLayout(name ="mainScreen"))
        screen_manager.add_widget(Configuration(name="configScreen"))
        screen_manager.add_widget(Information(name="InfoScreen"))
        screen_manager.add_widget(Wifi(name="WifiScreen"))
        screen_manager.add_widget(AddWifi(name="AddWifiScreen"))

if __name__ == '__main__':
    myApp().run()
