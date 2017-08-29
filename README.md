A Project made to test react drag and drop
Based on React Drag and drop - https://github.com/react-dnd/react-dnd
Along with support touch based on yahoo (as touch backend) -  https://github.com/yahoo/react-dnd-touch-backend
Along with Dragpreview support and Immutable.js


#### Feature list made with this ap

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

* You'll need to have git and node installed + npm

* clone the project from https://github.com/omer257/React_drag_drop_touch


Then install the dependencies:

```
> $ npm install
> $ npm run build
```

Start the server
```
> $ npm start
```

Client code is in the client directory.


Open the web browser to `http://0.0.0.0:1234/`

