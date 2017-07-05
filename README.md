# Wisdo React Exercise
A React FED Exercise

### Instructions

Our benevolent supreme leader is not happy with the type of music that is played in the office. You are tasked with
building him an interface to select the music that will be played daily in our facilities to ensure worker productivity remains high.

![Screenshot][screenshot1]

#### Guidelines

The purpose of this exercise is to test building real-life react components. We will review the code and check that it works.
But just as important it should be clean clear and _simple_.

+ You are allowed (in fact encouraged) to use any 3rd party library you need to.
+ You may use any flavour of javascript you like. We have set up ES6 support via babel6 but you can add/remove presets and loaders if you need to

#### Feature List for the application

+ The interface will be delivered over the web and accessed either from his Excellency laptop or iPad Mini.
 + The result should work both on iPad resolution (768x1024 px	1024x768 px) and bigger screen resolutiosn well
 + Use the screenshot above as a guide. style.scss has some constants to get you started.
+ On the left our great leader will expect to see the list of approved songs, (You can find that list in song-list.json).
+ Clicking on a song from the songlist will add it to the end of a playlist.
+ Clicking the trash icon on a song should remove it from the playlist
+ Our fearless leader must be able to drag and drop songs.
 + It should be possible to order the playlist using drag and drop
 + dragging items from the songlist to the playlist should work
 + dragging items outside the playlist should remove them from the playlist
 + Please make sure that list items move with proper animation/transition our eternal father hates it when html changes abruptly
 + Also it is important that dragging will work both on a laptop using the mouse and on the iPad using touch events.
+ The application currently has no server/backend to speak of. For now you may print the playlist to the console whenever it changes. 

### To start

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* clone the project


Then install the dependencies:

```
> $ npm install
> $ npm run build
```

Start the server
```
> $ npm start
```

Client code is in the client directory. webpack is configured around index.html and index.js but the structure is up to you.


Open the web browser to `http://localhost:8888/`

[screenshot1]: https://github.com/medicope/FED-Exercise/blob/master/docs/screenshot1.png "Screenshot"
