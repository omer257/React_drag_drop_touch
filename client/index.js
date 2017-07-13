/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SortableList from './SortableList.jsx';
import Immutable from 'immutable';
import { default as Touch } from './Touch';
import DragDropContext from 'react-dnd/lib/DragDropContext';
import { default as ItemPreview } from './ItemPreview.jsx';
var style = require('./style.scss'); 

import {songs} from './song-list.json'
let initialData1 = [];
let initialData2 = [];
let cssObj = [{
    mainId:'left',
    mainClass:'col-sm-5',
    h1Color:'#000000',
    ulClass:'timeline',
    h1:'My playlist'
},{
    mainId:'right',
    mainClass:'col-sm-7',
    h1Color:'#ffffff',
    ulClass:'timeline timeline_center',
    h1:'My songlist'
}]
let z = 0;
for (; z < 3; z++) {
    initialData1.push({
        id: z,
        name: songs[z].title,
        artist: songs[z].artist,
        image: songs[z].image
    });
}
for ( let i=0; i<  3; i++) {
    initialData2.push({
        id: i,
        name: songs[i+1].title,
        artist: songs[i+1].artist,
        image: songs[i+1].image
    });
}

let datasource = window.datasource = Immutable.fromJS([initialData1, initialData2]);

function reorder (fromObj, toObj) {
    const dragListId = fromObj.listId;
    const dragId = fromObj.id;
    const dropListId = toObj.listId;
    const dropId = toObj.id;
    console.log(`Dragged ${dragId} in list ${dragListId} to ${dropId} in list ${dropListId}`);
    datasource = datasource.withMutations(source => {
        const dragList = source.get(dragListId);
        const dragIndex = dragList.findIndex(item => item.get('id') === dragId);
        const dragItem = dragList.get(dragIndex);
       
        const dropList = source.get(dropListId);
        let dropIndex = dropList.findIndex(item => item.get('id') === dropId);

        if ( 
            dragListId === dropListId &&
            dragIndex <= dropIndex
        ) {
            dropIndex++;
        }

        if(dropListId===0 && dragListId===1){//prevent draggin from  list 0 to 1
            source.set(dragListId, dragList.delete(dragIndex));//prevent deleting item moving from list 0 to 1s
            return;
        }
        source.set(dragListId, dragList.delete(dragIndex));//prevent deleting item moving from list 0 to 1s
        source.set(dropListId, dropList.splice(dropIndex, 0, dragItem));
    });

    render(datasource);
}


function App ({lists}) {
    return (
        <div>
            {lists.toArray().map((list, i) =>
                <SortableList key={i} id={i} data={list} onReorder={reorder} cssObj={cssObj[i]}/>
            )}
            <ItemPreview key="__preview" name="Item" />
        </div>
    );
}

var DragDropApp = DragDropContext(Touch({ enableMouseEvents: true }))(App);

function render (lists = datasource) {
    ReactDOM.render(<DragDropApp lists={lists} />, document.getElementById('main'));
}

render();
