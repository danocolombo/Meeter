import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGroup } from '../../actions/group';

const GroupListItem = ({
    group: { groupId, gender, title, location, facilitator, attendance },
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
                    <Link to={`/EditGroup/${groupId}`}>
                        {get1Line(gender, title, attendance, location, facilitator)}
                    </Link>
                </div>
                <div className={'GItem-Line2'}>
                    {get2Line(location, facilitator)}
                </div>
                <div className={'GItem-Button'}>
                    {role !== 'guest' ? (
                        <i
                            className={'fa fa-trash my'}
                            onClick={() => deleteGroup(groupId)}
                        ></i>
                    ) : null}
                </div>
                <div className={'GItem-Nutn'}></div>
            </div>
        </Fragment>
    );
    // <p style={{ 'padding-left': 10 }}>
};
function get1Line(g, t, a) {
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
    if (a > 0){
        line1 = line1.concat(' ', a);
    }
    return [<span key='{line1}'>{line1}</span>];
}
function get2Line(l, f) {
    // if (l) console.log(l + ' ' + l.length);
    // if (f) console.log(f + ' ' + f.length);
    // console.log(l + ' ' + l.length);
    //console.log(f + ' ' + f.length);
    let line2 = '';
    let tmp = '';
    if (l){
        if (l.length > 0) {
            line2 = l;
        }
    }
    if (f){
        if (f.length > 0) {
            if (line2.length > 0) {
                tmp = line2.concat(' - ', f);
                line2 = tmp;
            }
        } else {
            line2 = f;
        }
    }
    return line2;
}
GroupListItem.propTypes = {
    group: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // mid: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    deleteGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteGroup })(GroupListItem);
