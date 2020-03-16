import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { FormLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteGroup, createGroup } from '../../actions/gathering';

const EditGroup = ({ deleteGroup, createGroup }) => {
    const [selectedValue, setSelectedValue] = React.useState('a');
    const handleRadioChange = event => {
        setSelectedValue(event.target.value);
      };
    return (
        <>
            <Fragment>
                <div className='group-container'>
                    <header class='grpHeader'>
                        <h2>Open Share Group</h2>
                    </header>
                    <div className='grpTitle'><TextField id="grpTitle" label="Group title" variant="outlined" fullWidth="true"/></div>
                    <div className='navButtons'>
                        <Button variant="contained" color="primary" size="small" className="pl10">Save</Button>{"      "}<Button variant="contained" color="secondary" size="small">Go Back</Button>
                    </div>
                    <div className='grpCntRadios'>
                    <Input id="attendance" label="attendance" type="number" defaultValue="0" className="attendance"/>
                        <Radio
                            checked={selectedValue === 'f'}
                            onChange={handleRadioChange}
                            value="f"
                            label="Women"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'f' }}
                        /> Women
                        <Radio
                            checked={selectedValue === 'm'}
                            onChange={handleRadioChange}
                            value="m"
                            
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'm' }}
                        /> Men
                        <Radio
                            checked={selectedValue === 'x'}
                            onChange={handleRadioChange}
                            value="x"
                            label="Mixed"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'x' }}
                        /> Mixed
                    
                    </div>
                    <div className='grpLocation'><TextField id="grpLocation" label="Location" variant="outlined" fullWidth="true"/></div>
                    <div className='grpSpace' />
                    <div className='grpFacilitator'><TextField id="grpFacilitator" label="Facilitator" variant="outlined" fullWidth="true"/></div>
                    <div className='grpSpace'></div>
                    <div className='grpCoFacilitator'><TextField id="grpCoFacilitator" label="Co-Facilitator" variant="outlined" fullWidth="true"/></div>
                    <div className='grpSpace'></div>
                    <div className='grpNotes'><TextField
                        id="grpNotes"
                        label="Notes"
                        multiline
                        rows="2"
                        defaultValue=""
                        fullWidth="true"
                        variant="outlined"
                    /></div>
                </div>
            </Fragment>
        </>
    );
};

EditGroup.propTypes = {
    // groups: PropTypes.array.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired
};

export default connect(null, { deleteGroup, createGroup })(EditGroup);
