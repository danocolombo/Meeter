import React, { useState } from 'react';
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
    const [gender, setGender] = useState(grpGender);
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
            case 'location':
                setLocation(value);
                break;
            default:
                break;
        }
    };
    const meetingGenders = [
        { value: 'm', label: 'Men' },
        { value: 'f', label: 'Women' },
        { value: 'x', label: 'Other' },
    ];
    let gValue = 'x';
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
                            defaultValue={(grpId = '0' ? 'DEFAULT' : gender)}
                            className='admin-edit-default-group-component__gender-control'
                            name='gender'
                            id='gender'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            // onChange={(e) => {
                            //     setGender((preValues) => {
                            //         return [...preValues, e.target.value];
                            //     });
                            // }}
                        >
                            {
                                (grpId = '0' ? (
                                    <MenuItem id='0' value='DEFAULT' disabled>
                                        Choose a salutation ...
                                    </MenuItem>
                                ) : null)
                            }
                            ;
                            {meetingGenders.map((g) => (
                                <MenuItem
                                    id={g.value}
                                    key={g.value}
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
