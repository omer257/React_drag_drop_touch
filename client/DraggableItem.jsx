/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import DragSource from 'react-dnd/lib/DragSource';
var _template1 = require('./template1.js');
var _template2 = require('./template2.js');

import classnames from 'classnames';

/**
 * The docs for the following functions can be found in
 * react-dnd's docs: http://gaearon.github.io/react-dnd/docs-overview.html
 */
const dragSource = {
    beginDrag (props) {
        return {
            id: props.id,
            listId: props.listId,
            name: props.name,
            artist: props.artist,
            image: props.image,
            onReorder: props.onReorder
        };
    }
};


class Item extends React.Component { 
        reorderHelper(){
            let item = {
                id: this.props.id,
                listId: this.props.listId,
                name: this.props.name,
                artist: this.props.artist,
                image: this.props.image,
                onReorder: this.props.onReorder
            }
            item.onReorder(
            {
                listId: item.listId,
                id: item.id
            },
            {
                listId: this.props.listId=== 0 ? 1 : 0,
                id: this.props.id
            },1);
        }

    render () {

        let templateElem = null;
        if (this.props.class==='left') {
        templateElem = <_template1 props={this.props} onReorder={this.reorderHelper} />;
        } else {
        templateElem = <_template2 props={this.props} onReorder={this.reorderHelper} />;
        }
        let content = (
            <li>
            {templateElem}
            </li>
        );
        // Connect as drag source
        content = this.props.connectDragSource(content, { dropEffect: 'move' }); 
        // Connect to drag layer
        content = this.props.connectDragPreview(content);

        return content;
    }
}

Item.PropTypes = {
    id: React.PropTypes.number.isRequired,
    listId: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,

    // react-dnd props
    connectDragSource: React.PropTypes.func, 
    connectDragPreview: React.PropTypes.func,
    onReorder: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    isOver: React.PropTypes.bool
};

export default DragSource(
    'Item',
    dragSource,
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    })
)(Item);
