import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/group';

const GatheringGroupListItem = ({
    group: { groupId, gender, title, location, facilitator, attendance },
    role,
    deleteGroup,
}) => {

    return (
        <>
            <div className="group-list-component__wrapper">
                <div className="group-list-component__row">
                    <div className={'group-list-component__definitions'}>
                        <NavLink to={`/EditGroup/${groupId}`} className={'group-list-compoment__nav-link'}>{(
                            gender === 'f' ? 'Women\'s ' + title:
                            gender === 'm' ? 'Men\'s ' + title: title
                            // gender === 'x' ? '' : null
                            )}
                        </NavLink>
                        <div className={'group-list-component__attendance'}>{attendance}</div>
                    </div>
                    <div>
                    {role !== 'guest' ? (
                        <i
                            className={'fa fa-trash gather-component__trash-style'}
                            onClick={() => deleteGroup(groupId)}
                        ></i>
                    ) : null}
                    </div>
                </div>
                {facilitator ? (
                            <div className="group-list-component__row">
                                <div className="group-list-component__facilitator">{facilitator}</div>
                            </div>):null
                        }
                <div className="group-list-component__row">
                    <div className={'group-list-component__location'}>{location}</div>
                </div>
            </div>
        </>
    );
};

GatheringGroupListItem.propTypes = {
    group: PropTypes.object.isRequired,
    // auth: PropTypes.object.isRequired,
    // // mid: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // auth: state.auth,
});

export default connect(mapStateToProps, { deleteGroup })(GatheringGroupListItem);
