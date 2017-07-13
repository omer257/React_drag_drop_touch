/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

import React from 'react';
import DraggableItem from './DraggableItem.jsx';
import { List } from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SearchForm from './SearchForm';
import _ from 'underscore';


export default function SortableList ({ data, id, onReorder, cssObj }) {

    function filterSearch(data) { 
        data = _.filter(data, function (item) {
            var lowCaseData = data.toLowerCase();
        return (item.title.toLowerCase().indexOf(lowCaseData) > -1 || item.artist.toLowerCase().indexOf(lowCaseData) > -1) ;
        })
    }

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

    let isSearchForm = null;
    if (cssObj.isSearchForm) {
        isSearchForm = <SearchForm filterSearch={filterSearch}/>;
    } 

    return (
    <div className={cssObj.mainClass} id={cssObj.mainId}>
        {isSearchForm}
        <div className={cssObj.isDottedClass}>
          <h3 style={{color: cssObj.h1Color}}>{cssObj.h1}</h3>
        </div>
            <ul className={cssObj.ulClass}>
               <ReactCSSTransitionGroup
                    transitionName="reactAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
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
