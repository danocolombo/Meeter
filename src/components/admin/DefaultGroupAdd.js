import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const DefaultGroupForm = ({ handleGroupAdd }) => {
    const [gender, setGender] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [facilitator, setFacilitator] = useState('');
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

    const handleConfirm = () => {
        const r = 'SAVE';
        const g = gender;
        const t = title;
        const l = location;
        const f = facilitator;
        setGender('');
        setTitle('');
        setLocation('');
        setFacilitator('');
        handleGroupAdd(r, g, t, l, f);
    };
    const handleCancel = () => {
        const r = 'CANCEL';
        const g = gender;
        const t = title;
        const l = location;
        const f = facilitator;
        setGender('');
        setTitle('');
        setLocation('');
        setFacilitator('');
        handleGroupAdd(r, gender, title, location, facilitator);
    };

    return (
        <div>
            <div className='bg-primary p'>
                <h3>Add New Default Group</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {/* <h3>Add New Default Group</h3> */}
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
                    <span className='small'>** Gender & Title required</span>
                    <br />
                    {gender != 0 && title ? (
                        <i
                            className={'pl-2 fas fa-check my-1'}
                            onClick={handleConfirm}
                        ></i>
                    ) : (
                        <i className={'pl-2 fas fa-hand-paper my-1'}></i>
                    )}

                    <i className={'pl-2 fa fa-ban'} onClick={handleCancel}></i>
                </div>
            </form>
        </div>
    );
};

// PostForm.propTypes = {
//     addPost: PropTypes.func.isRequired,
// };

export default connect(null, { addPost })(DefaultGroupForm);
