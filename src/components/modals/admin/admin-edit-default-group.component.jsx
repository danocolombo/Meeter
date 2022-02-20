import React, { useState, useRef } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import './admin-edit-default-group.styles.scss';
const EditDefaultGroup = ({
    isOpened = true,
    children,
    group: { grpId, grpGender, grpTitle, grpFacilitator, grpLocation },
    onUpdate,
    onCancel,
}) => {
    const refTitle = useRef();
    const refFacilitator = useRef();
    const refLocation = useRef();
    const [gender, setGender] = useState(grpGender);
    const [buttonDisapbled, setButtonDisabled] = useState(true);
    const [title, setTitle] = useState(grpTitle);
    const [facilitator, setFacilitator] = useState(grpFacilitator);
    const [location, setLocation] = useState(grpLocation);

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'facilitator':
                setFacilitator(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'location':
                setLocation(value);
                break;
            default:
                break;
        }
        // console.log('===============================');
        // console.log('refGender.current.value:', refGender.current.value);
        // console.log('refTitle.current.value:', refTitle.current.value);
        // console.log(
        //     'refFacilitator.current.value:',
        //     refFacilitator.current.value
        // );
        // console.log('refLocation.current.value:', refLocation.current.value);
        //if if all fields are filled out AND the values are different than when
        //we started.
        let requirementsMet = false;
        if (
            refTitle.current.value.length > 0 &&
            // refGender.current.value !== '' &&
            refFacilitator.current.value.length > 0 &&
            refLocation.current.value.length > 0
        ) {
            requirementsMet = true;
        }
        //========================================
        // check if the entered values are
        // any different than what we started with
        //========================================
        let different = false;
        if (
            // refGender.current.innerText !== grpGender ||
            refTitle.current.value !== grpTitle ||
            refFacilitator.current.value !== grpFacilitator ||
            refLocation.current.value !== grpLocation
        ) {
            different = true;
        }
        if (different === true && requirementsMet) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    };
    const meetingGenders = [
        { value: 'm', label: 'Men' },
        { value: 'f', label: 'Women' },
        { value: 'x', label: 'Other' },
    ];
    return (
        <div>
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
                <div className='admin-edit-default-group-component__wrapper'>
                    <div className='admin-edit-default-group-component__header'>
                        Group Edit
                    </div>
                    <div className='admin-edit-default-group-component__message'>
                        Update as desired, click Update.
                        <br />
                    </div>
                    <FormControl
                        variant='standard'
                        sx={{ m: 1, minWidth: 120 }}
                        className='admin-edit-default-group-component__form-wrapper'
                    >
                        <Select
                            defaultValue={gender}
                            className='admin-edit-default-group-component__gender-control'
                            name='gender'
                            id='gender'
                            value={gender}
                            onChange={handleChange}
                            // onChange={(e) => setGender(e.target.value)}
                            // onChange={(e) => {
                            //     setGender((preValues) => {
                            //         return [...preValues, e.target.value];
                            //     });
                            // }}
                        >
                            {grpId === '0' ? (
                                <MenuItem
                                    key='0'
                                    id='0'
                                    defaultValue='DEFAULT'
                                    disabled
                                >
                                    Choose Group Gender ...
                                </MenuItem>
                            ) : null}
                            ;
                            {meetingGenders.map((g) => (
                                <MenuItem
                                    key={g.value}
                                    id={g.value}
                                    value={g.value}
                                >
                                    {g.label}
                                </MenuItem>
                            ))}
                            ;
                        </Select>
                    </FormControl>
                    <div className='admin-edit-default-group-component__title-box'>
                        <label>Title: </label>
                        <input
                            ref={refTitle}
                            type='text'
                            name='title'
                            id='title'
                            value={title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='admin-edit-default-group-component__facilitator-box'>
                        <label>Facilitator: </label>
                        <input
                            ref={refFacilitator}
                            type='text'
                            name='facilitator'
                            id='facilitator'
                            value={facilitator}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='admin-edit-default-group-component__location-box'>
                        <label>Location: </label>
                        <input
                            ref={refLocation}
                            type='text'
                            name='location'
                            id='location'
                            value={location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='admin-edit-default-group-component__button-wrapper'>
                        <button
                            disabled={buttonDisapbled}
                            className='admin-edit-default-group-component__submit-button'
                            onClick={() =>
                                onUpdate({
                                    groupId: grpId,
                                    gender: gender,
                                    title: title,
                                    facilitator: facilitator,
                                    location: location,
                                })
                            }
                        >
                            UPDATE
                        </button>
                        <button
                            className='admin-edit-default-group-component__cancel-button'
                            onClick={() => onCancel()}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </FormControl>
        </div>
    );
};

export default EditDefaultGroup;
