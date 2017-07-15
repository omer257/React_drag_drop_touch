import React from 'react';
import PropTypes from 'prop-types';

export class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        //Bind funcs
        this.handleChange = this.handleChange.bind(this);
        this.state = {input: ''};
    } 
    handleChange(event) {
        let item = event.target.value;
        this.setState({input: item});
        this.props.filterSearch(item);
    }
    render() {
        return (
            <form action="#" className="search-form">
                <div className="form-group has-feedback">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input
                        type="text"
                        className="form-control"
                        name="search"
                        id="search"
                        placeholder="Search"
                        value={this.state.value}
                        onChange={this.handleChange}/>
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </form>

        );
    }
}

SearchForm.PropTypes = {
    filterSearch: PropTypes.func.isRequired
};
export default SearchForm;
