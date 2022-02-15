import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './groups-component.styles.scss';
const GroupComponent = ({
    group: { groupId, gender, groupTitle, location, facilitator },
    onDeleteGroup,
}) => {
    return (
        <>
            <div className='group-item__wrapper'>
                <div className='group-item__container'>
                    <div className='group-item__delete-button-wrapper'>
                        <button
                            onClick={() => onDeleteGroup(groupId)}
                            type='button'
                            className='group-item__delete-button'
                        >
                            <i className='fas fa-times' />
                        </button>
                    </div>
                    <div className='group-item__row'>
                        <div className='group-item__label'>
                            {gender === 'f' ? "Women's" : "Men's"} {groupTitle}
                        </div>
                    </div>
                    <div className='group-item__row'>
                        <span className='group-item__label'>Facilitator: </span>
                        <span className='group-item__value'>{facilitator}</span>
                    </div>
                    <div className='group-item__row'>
                        <span className='group-item__label'>Location: </span>
                        <span className='group-item__value'>{location}</span>
                    </div>
                    <Stack
                        direction='row'
                        className='group-item__button-wrapper'
                    >
                        <Button
                            variant='contained'
                            className='group-item__edit-button'
                            href={`/EditGathering/${groupId}`}
                        >
                            EDIT
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    );
};
export default GroupComponent;
