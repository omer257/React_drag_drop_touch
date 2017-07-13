/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import DraggableItem from './DraggableItem.jsx';
import { List } from 'immutable';

export default function SortableList ({ data, id, onReorder, cssObj }) {
    const items = data.toArray().map((obj,i) => (
        <DraggableItem
            key={i}
            index={i}
            id={obj.get('id')}
            listId={id}
            name={obj.get('name')}
            artist={obj.get('artist')}
            image={obj.get('image')}
            class={cssObj.liClass}
            onReorder={onReorder}
        />
    ));

    return (

    <div className="col-sm-6" id={cssObj.mainId}>
        <h1>{cssObj.h1}</h1>
            <ul className={cssObj.ulClass}>
            {items}
            </ul>

    </div>
    );
}

SortableList.propTypes = {
    id: React.PropTypes.number.isRequired,
    data: React.PropTypes.instanceOf(List).isRequired,
    onReorder: React.PropTypes.func
};
