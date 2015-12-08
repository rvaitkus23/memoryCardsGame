# Memory Cards Game #

This is Memory Cards Game build using AngularJS, to demonstrate coding skills using AngularJS.
There is pairs of cards on the deck face-down. You can open two cards at once and if they matches, will stay opened. User wins when all cards are facing up 
 
## Run application ##

To start app you need to navigate to root directory of project and start your preferred web server.

## Development setup ##

To set up project for development you need Node Package manager (NPM) installed.
In root directory run npm install (probably with sudo). It will install all dependencies.

 ```
 npm install 
 ```
 
Installs dependencies of this project Grunt task runner and modules that is used by tasks defined in Gruntfile.js. All dependencies you can find in package.json file List of packages used by grunt:

* SASS files compiler
* CSS minification tool
* JS uglify
* File watcher to automate some tasks after changes
* File injector. It does inject some source files to html files

To enable automation after source files are changed run grunt task

```
grunt watch
```

To inject source files to index.html you have to run build task with 'dev' key. This is needed every time new file js or css file is created. To make sure it is in watched files list check app_js and app_css variables in Gruntfile.js.

```
grunt build:dev
```

To build release version with minified js and css files you need to run grunt build with release keyword

```
grunt build:release
```

## Third party libraries/tools ##

1. https://github.com/nkcraddock/angular-playing-cards - to draw faces of cards (a bit modified).
2. https://github.com/rzajac/angularjs-slider - slider to select how many pairs to display.

## TODO list ##

* Work on styling, layout and other styling stuff
* Store and display completed games statistic and order it placing best results on top (best result - to be defined)
* Review naming conventions 
* Better user promt then game is completed 

