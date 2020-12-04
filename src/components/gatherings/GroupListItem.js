import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/group';

const GroupListItem = ({
    group: { id, meetingId, gender, title, location, facilitator },
    role,
    deleteGroup,
}) => {
    // const handleDeleteRequest = () => {
    //     // send key of entry to delete
    //     console.log('delete click');
    //     deleteGroup(id);
    // };
    return (
        <Fragment>
            <div className='GItem-Box'>
                <div className={'GItem-Line1'}>
                    <Link to={`/Groups/${meetingId}/${id}`}>
                        {get1Line(gender, title, location, facilitator)}
                    </Link>
                </div>
                <div className={'GItem-Line2'}>
                    {get2Line(location, facilitator)}
                </div>
                <div className={'GItem-Button'}>
                    {role !== 'guest' ? (
                        <i
                            className={'fa fa-trash my'}
                            onClick={() => deleteGroup(id)}
                        ></i>
                    ) : null}
                </div>
                <div className={'GItem-Nutn'}></div>
            </div>
        </Fragment>
    );
    // <p style={{ 'padding-left': 10 }}>
};
function get1Line(g, t) {
    let line1 = '';
    switch (g) {
        case 'f':
            line1 = "Women's - ";
            break;
        case 'm':
            line1 = "Men's - ";
            break;
        default:
            break;
    }
    if (t.length > 0) {
        line1 = line1.concat(' ', t);
    }
    return [
        <span id='t' key='t'>
            {line1}
        </span>,
    ];
}
function get2Line(l, f) {
    console.log(l + ' ' + l.length);
    console.log(f + ' ' + f.length);
    let line2 = '';
    let tmp = '';
    if (l.length > 0) {
        line2 = l;
    }

    if (f.length > 0) {
        if (line2.length > 0) {
            tmp = line2.concat(' - ', f);
            line2 = tmp;
        }
    } else {
        line2 = f;
    }

    return [
        <span id='l' key='l'>
            {line2}
        </span>,
    ];
}
GroupListItem.propTypes = {
    // group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // mid: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteGroup })(GroupListItem);
