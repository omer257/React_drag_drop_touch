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
    isSearchForm:true,
    isDottedClass:"dotted",
    h1Color:'#000000',
    ulClass:'timeline',
    h1:'My songlist'
},{
    mainId:'right',
    mainClass:'col-sm-7',
    isSearchForm:false,
    isDottedClass:'',
    h1Color:'#ffffff',
    ulClass:'timeline timeline_center',
    h1:'My playlist'
}]
let z = 0;
for (; z < 20; z++) {
    initialData1.push({
        id: z,
        name: songs[z].title,
        artist: songs[z].artist,
        image: songs[z].image
    });
}
for ( let i=0; i<  2; i++) {
    initialData2.push({
        id: i,
        name: songs[i+1].title,
        artist: songs[i+1].artist,
        image: songs[i+1].image
    });
}

let datasource = window.datasource = Immutable.fromJS([initialData1, initialData2]);

function reorder (fromObj, toObj,addAsLast) {
    const dragListId = fromObj.listId;
    const dragId = fromObj.id;
    const dropListId = toObj.listId;
    const dropId = toObj.id;
    const behaviour = {
        allowDelete: true,
        allowCopy: true,
    };
    
    
    if(dragListId===1 && dropListId===0){
        behaviour.allowCopy=false;
    }
    if(dragListId===0 && dropListId===1){
        behaviour.allowDelete=false;
    }
    if(dragListId===0 && dropListId===0){
        behaviour.allowDelete=false;
        behaviour.allowCopy=false;
    }
    
    console.log(`Dragged ${dragId} in list ${dragListId} to ${dropId} in list ${dropListId}`);

    datasource = datasource.withMutations(source => {
        const dragList = source.get(dragListId);
        const dragIndex = dragList.findIndex(item => item.get('id') === dragId);
        const dragItem = dragList.get(dragIndex);

        if(behaviour.allowDelete){
            source.set(dragListId, dragList.delete(dragIndex));
        }
        const dropList = source.get(dropListId);
        let dropIndex = dropList.findIndex(item => item.get('id') === dropId);

        if ( 
            dragListId === dropListId &&
            dragIndex <= dropIndex
        ) {
            dropIndex++;
        }

        if(addAsLast){
             dropIndex = dropList.size+1;
        }
        if(behaviour.allowCopy){
            source.set(dropListId, dropList.splice(dropIndex, 0, dragItem));
        }
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
