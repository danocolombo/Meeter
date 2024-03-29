import React, { useState } from 'react';
// import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
//import { clearTmpGroup, getGroup, getGroups } from '../../../../actions/group';
// import { Edit } from '@material-ui/icons';
const initialState = {
    gender: '',
    title: '',
    location: '',
    facilitator: '',
    clientId: '',
};
const EditDefaultGroup = ({
    // addDefaultGroup,
    // client: { defaultGroups },
    // group: { tmpGroup },
    // clearTmpGroup,
    // getDefaultGroup,
    group,
    match,
}) => {
    const [formData, setFormData] = useState(initialState);

    const { gender, title, location, facilitator } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='config-component__wrapper'>
            <form
                className='form my-1'
                onSubmit={(e) => {
                    e.preventDefault();
                    // formData.clientId = client.clientId;
                    // addDefaultGroup({ formData });
                    // gender('');
                    // title('');
                    // location('');
                    // facilitator('');
                }}
            >
                <div className={'config-new-group__group-detail-box'}>
                    <div className='bg-primary p'>
                        <h3>Add A Default Group</h3>
                    </div>
                    <select
                        key='2'
                        className='config-new-group__gender-selectr'
                        name='gender'
                        value={gender}
                        onChange={(e) => onChange(e)}
                    >
                        <option value='0'>** Select Gender</option>
                        <option value='f'>Women's</option>
                        <option value='m'>Men's</option>
                        <option value='x'>Mixed</option>
                    </select>
                    <input
                        type='text'
                        className='DGF-Title'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={onChange}
                        required
                    />
                    <input
                        type='text'
                        className='DGF-Location'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={onChange}
                    />
                    <input
                        type='text'
                        className='DGF-Facilitator'
                        placeholder='Facilitator'
                        name='facilitator'
                        value={facilitator}
                        onChange={onChange}
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-dark my-1'
                    value='Add Group'
                />
            </form>
        </div>
    );
};
export default EditDefaultGroup;
// EditDefaultGroup.propTypes = {
//     getGroup: PropTypes.func.isRequired,
//     client: PropTypes.object.isRequired,
//     group: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//     client: state.client,
//     group: state.group,
// });
// export default connect(mapStateToProps, {
//     getGroup,
// })(withRouter(EditDefaultGroup));
