import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDefGroup } from '../../../actions/admin';
import './group-component.styles.scss';
const GroupItem = ({
    deleteDefGroup,
    auth,
    defGroup: { groupId, gender, groupTitle, location, facilitator },
    showActions,
    client,
    history,
}) => {
    return (
        <Fragment>
            <div className='group-item__wrapper'>
                <div className='group-item__container'>
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
                </div>
            </div>
        </Fragment>
    );
};

GroupItem.defaultProps = {
    showActions: true,
};

GroupItem.propTypes = {
    defGroup: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired,
    deleteDefGroup: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    client: state.client,
});

export default connect(mapStateToProps, { deleteDefGroup })(GroupItem);
