import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
// const initialState = {
//     _id: null,
//     gender: '',
//     title: '',
//     location: '',
//     facilitator: '',
// };
const DefaultGroupForm = ({
    _idValue,
    genderValue,
    titleValue,
    locationValue,
    facilitatorValue,
    handleResponse,
}) => {
    useEffect(() => {
        setId(_idValue);
        setGender(genderValue);
        setTitle(titleValue);
        setLocation(locationValue);
        setFacilitator(facilitatorValue);
    }, [_idValue, genderValue, titleValue, locationValue, facilitatorValue]);
    const [id, setId] = useState(_idValue);
    const [gender, setGender] = useState(genderValue);
    const [title, setTitle] = useState(titleValue);
    const [location, setLocation] = useState(locationValue);
    const [facilitator, setFacilitator] = useState(facilitatorValue);
    const onChange = (e) => {
        switch (e.target.name) {
            case 'location':
                setLocation(e.target.value);
                break;
            case 'title':
                setTitle(e.target.value);
                break;
            case 'facilitator':
                setFacilitator(e.target.value);
                break;
            case 'gender':
                setGender(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleEditConfirm = () => {
        const r = 'SAVE';
        handleResponse(r, id, gender, title, location, facilitator);
    };
    const handleEditCancel = () => {
        const r = 'CANCEL';
        handleResponse(r, id, gender, title, location, facilitator);
    };

    return (
        <div>
            <div className='bg-primary p'>
                {_idValue ? (
                    <h3>Edit Default Group</h3>
                ) : (
                    <h3>Add Default Group</h3>
                )}
            </div>
            <form
                className='form my-1'
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {id ? <h3>Edit Default Group</h3> : <h3>Update Group</h3>}
                <div className='DefaultGroupFormBox'>
                    <select
                        key='2'
                        className='DGF-Gender'
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
                        placeholder='Title'
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
                <div>
                    <i
                        className={'pl-2 fas fa-check my-1'}
                        onClick={handleEditConfirm}
                    ></i>
                    <i
                        className={'pl-2 fa fa-ban'}
                        onClick={handleEditCancel}
                    ></i>
                </div>
            </form>
        </div>
    );
};

// PostForm.propTypes = {
//     addPost: PropTypes.func.isRequired,
// };

export default connect(null, { addPost })(DefaultGroupForm);
