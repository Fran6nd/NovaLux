# Installation

You will need to install python3:<br>

* Python3 (https://www.python.org/downloads/).

Now you can clone the repository:
<br>

* `git clone path-to-this-git-repo`

<br>

And then open the project's folder: <br>

* `cd novalux`

<br>

Then setup a virtual environnement (Facultative but recommended):<br>
* Install `virtualenv`: `python3 -m pip install virtualenv`
* Create the environnement: `python3 -m virtualenv -p python3 env`
* Activate it: `source env/bin/activate`.
* To exite use `deactivate`.

<br>
Once activated, we will need to install the requirements:<br>

* `pip3 install -r requirements.txt`.

<br>


Finally run it!<br>

* `./main.py`

# Contributing

Just a few rules:<br>
* Format correctly your code (you can do `autopep8 --in-place --aggressive --aggressive src/*.py`).
* Format correctly your commits(`myFolfder: what I Did`, or `myFolder/test.py: what I did`).
* Add external dependencies as less as possible.

<br>Note that the commit standard is new now so not really applied yet.


## How to commit
All commits should follow this format:
`{place}:{what}.`
Example:
`project/test.js: Added unit tests.`

## Coding rules

All files should be runnable directly via Node... in order to run tests.

About the naming: We are following camelCase. It means that for variables, instances we name as follow:
`testApp`
`myCounter`
And about class:
`MyCharacter`
`NetworkController`

Do not forget to place spaces before and after symbols.
Not `a=1;`
But `a = 1;`

Be careful about trailing whitespaces...
