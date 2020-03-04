#!/usr/bin/env python3
from kivy.uix.behaviors.button import ButtonBehavior
from kivy.uix.widget import Widget
from kivy.lang import Builder
from kivy.vector import Vector


KV = """
<CircularButton>:
    size: (min(self.width,self.height),min(self.width,self.height)) # force circle
    canvas:
        Color:
            rgba: ((1,0,0,1) if self.state == "normal" else (.5,0,0,1))
        Ellipse:
            pos: self.pos
            size: self.size
"""

Builder.load_string(KV)


class CircularButton(ButtonBehavior, Widget):
    def collide_point(self, x, y):
        return Vector(x, y).distance(self.center) <= self.width / 2


if __name__ == '__main__':
    from kivy.base import runTouchApp

    def callback(*args):
        print("i'm being pressed")

    runTouchApp(CircularButton(on_press=callback))