import React, { Component } from 'react';

class ServantSelect extends Component {
    constructor(props) {
        super(props);
    }

    //On the change event for the select box pass the selected value back to the parent
    // handleChange = event => {
    //     let selectedValue = event.target.value;
    // };

    render() {
        let arrayOfData = this.props.arrayOfData;
        let options = arrayOfData.map(data => (
            <option key={data.id} value={data.name}>
                {data.name}
            </option>
        ));

        return [
            <h4>{this.props.component}</h4>,
            <select
                value='{this.props.selectedValue}'
                name='{data.component}'
                className='{data.component}'
                onClick={this.props.onClick}
                onChange='onServantChange'
                //onChange={this.handleChange}
            >
                <option>{this.props.selectedValue}</option>
                {options}
            </select>
        ];
    }
}

export default ServantSelect;
