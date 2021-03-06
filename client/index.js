/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SortableList from './SortableList.jsx';
import Immutable from 'immutable';
import {default as Touch} from './Touch';
import DragDropContext from 'react-dnd/lib/DragDropContext';
import {default as ItemPreview} from './ItemPreview.jsx';
var style = require('./style.scss');

import {songs} from './song-list.json'
let initialData1 = [];
let initialData2 = [];
let cssObj = [
    {
        mainId: 'left',
        mainClass: 'col-sm-5',
        isSearchForm: true,
        isDottedClass: "dotted",
        h1Color: '#000000',
        ulClass: 'timeline',
        h1: 'My songlist'
    }, {
        mainId: 'right',
        mainClass: 'col-sm-7',
        isSearchForm: false,
        isDottedClass: '',
        h1Color: '#ffffff',
        ulClass: 'timeline timeline_center',
        h1: 'My playlist'
    }
]
let z = 0;
for (; z < songs.length; z++) {
    initialData1.push({id: z, name: songs[z].title, artist: songs[z].artist, image: songs[z].image});
}

let datasource = window.datasource = Immutable.fromJS([initialData1, initialData2]);

function reorder(fromObj, toObj, addAsLast) {
    const dragListId = fromObj.listId;
    const dragId = fromObj.id;
    const dropListId = toObj.listId;
    const dropId = toObj.id;
    const behaviour = {
        allowDelete: true,
        allowCopy: true
    };

    const allowDragToSource = dragListId === 1 && dropListId === 0;
    const allowSortMainList = dragListId === 0 && dropListId === 0;
    const PreventDeleteFromSource = dragListId === 0 && dropListId === 1;

    if (allowDragToSource) {
        behaviour.allowCopy = false;
    }
    if (PreventDeleteFromSource) {
        behaviour.allowDelete = false;
    }
    if (allowSortMainList) {
        behaviour.allowDelete = false;
        behaviour.allowCopy = false;
    }

    datasource = datasource.withMutations(source => {
        const dragList = source.get(dragListId);
        const dragIndex = dragList.findIndex(item => item.get('id') === dragId);
        const dragItem = dragList.get(dragIndex);


        if (behaviour.allowDelete) {
            source.set(dragListId, dragList.delete(dragIndex));
        }
        const dropList = source.get(dropListId);

        let dropIndex = dropList.findIndex(item => item.get('id') === dropId);

        if (dragListId === dropListId && dragIndex <= dropIndex) {
            dropIndex++;
        }

        if (addAsLast) {
            dropIndex = dropList.size;
        }

        if (behaviour.allowCopy) {
            source.set(dropListId, dropList.splice(dropIndex, 0, dragItem));

            if(dropListId !== dragListId){
            //increment id when adding an item - not moving
                source.setIn([dropListId, dropIndex, 'id'], dropIndex+1);
            }

        }
    });

    render(datasource);
}

function App({lists}) {
    return (
        <div>
            {lists
                .toArray()
                .map((list, i) => <SortableList
                    key={i}
                    id={i}
                    data={list}
                    onReorder={reorder}
                    cssObj={cssObj[i]}/>)}
            <ItemPreview key="__preview" name="Item"/>
        </div>
    );
}

var DragDropApp = DragDropContext(Touch({enableMouseEvents: true}))(App);

function render(lists = datasource) {
    ReactDOM.render(
        <DragDropApp lists={lists}/>, document.getElementById('main'));
}

render();
