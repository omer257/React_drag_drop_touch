/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DragLayer from 'react-dnd/lib/DragLayer';
var _template1 = require('./template1.js');
var _template2 = require('./template2.js');

function collect (monitor) {
    var item = monitor.getItem();
    return {
        id: item && item.id,
        name: item && item.name,
        listid: item && item.listid,
        artist: item && item.artist,
        image: item && item.image,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}

function ItemPreview ({
    id,
    name,
    artist,
    image,
    isDragging,
    currentOffset
}) {
    if (!isDragging) {
        return <li></li>;
    }

    return (
        <div
            className="item preview"
            style={getItemStyles(currentOffset)}>
            <div draggable="false" className="timeline-badge blue"></div>
					<div draggable="false"  className="timeline-panel">
					<img draggable="false"  src={image} alt={artist + " " + name}/>
						<div draggable="false"  className="timeline-heading">
							<h5 draggable="false"  className="timeline-title">{artist}
							- {name}</h5>
						</div>
					</div>
        </div>
    );
}

ItemPreview.PropTypes = {
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    artist: React.PropTypes.string,
    image: React.PropTypes.string,
    currentOffset: React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number
    }),
    isDragging: React.PropTypes.bool
};

export default DragLayer(collect)(ItemPreview);
