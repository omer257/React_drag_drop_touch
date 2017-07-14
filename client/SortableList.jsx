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


export default class SortableList extends React.Component {
    constructor(props) {
        super(props);
        this.filterSearch = this.filterSearch.bind(this);

        this.state = { 
            data: this.props.data,
            filteredData: this.props.data,
        };
    }
    componentWillReceiveProps(nextProps){
        if (!this.props.cssObj.isSearchForm) {
            this.setState({data:nextProps.data,filteredData:nextProps.data})
        } 
    }

    filterSearch(input) { 
        const regex = new RegExp(input, 'i');
        const filtered = this.state.data.filter(function(item) {
            return (item.get('name').search(regex) > -1 || item.get('artist').search(regex) > -1);
        });

        this.setState({
        filteredData: filtered,
        });
    }

  render() {

    const items = this.state.filteredData.map((obj,i) => (
        <DraggableItem
            key={i}
            index={i}
            id={obj.get('id')}
            listId={this.props.id}
            name={obj.get('name')}
            artist={obj.get('artist')}
            image={obj.get('image')}
            onReorder={this.props.onReorder}
            class={this.props.cssObj.mainId}
        />
    ));

    let isSearchForm = null;
    if (this.props.cssObj.isSearchForm) {
        isSearchForm = <SearchForm filterSearch={this.filterSearch}/>;
    } 
    return (
        <div className={this.props.cssObj.mainClass} id={this.props.cssObj.mainId}>
        {isSearchForm}
        <div className={this.props.cssObj.isDottedClass}>
          <h3 style={{color: this.props.cssObj.h1Color}}>{this.props.cssObj.h1}</h3>
        </div>
            <ul className={this.props.cssObj.ulClass}>
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
}

SortableList.propTypes = {
    id: React.PropTypes.number.isRequired,
    data: React.PropTypes.instanceOf(List).isRequired,
    onReorder: React.PropTypes.func
};
