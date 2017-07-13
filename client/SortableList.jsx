/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import DraggableItem from './DraggableItem.jsx';
import { List } from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchForm from './SearchForm'


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
            onReorder={onReorder}
            class={cssObj.mainId}
        />
    ));

    let templateElem = null;
    if (cssObj.mainId==='left') {
    templateElem = <SearchForm/>;
    } 

    return (

    <div className="col-sm-6" id={cssObj.mainId}>
        {templateElem}
        <div className="dotted">
          <h3 style={{color: cssObj.h1Color}}>{cssObj.h1}</h3>
        </div>
            <ul className={cssObj.ulClass}>
                <ReactCSSTransitionGroup
                transitionName="playlist"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {items}
                </ReactCSSTransitionGroup>
            </ul>

    </div>
    );
}

SortableList.propTypes = {
    id: React.PropTypes.number.isRequired,
    data: React.PropTypes.instanceOf(List).isRequired,
    onReorder: React.PropTypes.func
};
