import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
// import { connect } from 'react-redux';
// import { deleteDefGroup } from '../../actions/admin';

const DefaultGroups = ({
    // deleteDefGroup,
    // auth,
    mtgConfig: { _id, gender, title, location, facilitator },
    handleEdit,
    handleDelete,
    // showActions,
}) => {
    const handleEditRequest = () => {
        // send key of entry to edit
        handleEdit(_id, gender, title, location, facilitator);
    };
    const handleDeleteRequest = () => {
        // send key of entry to delete
        handleDelete(_id, gender, title, location, facilitator);
    };
    return (
        <Fragment>
            <div className={'adminDefaultGroupContainer'}>
                <div className={'pl-1 box-font-lead adminDefaultGroupLine1'}>
                    {line1(gender, title)}
                </div>
                <div className={'pl-1 box-font adminDefaultGroupLine2'}>
                    {line2(location, facilitator)}
                </div>
                <div className={'adminDefaultGroupButtons'}>
                    <span className={'pl-1'}>
                        <i
                            className={'fas fa-pen pl-2 my'}
                            onClick={handleEditRequest}
                        ></i>
                    </span>
                    <span className={'pl-2'}>
                        <i
                            className={'fa fa-trash my'}
                            onClick={handleDeleteRequest}
                        ></i>
                    </span>
                </div>
            </div>
        </Fragment>
    );
};
function line1(g, t) {
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
    const rnum = Math.random();
    return [<span id={rnum}>{line1}</span>];
}
function line2(l, f) {
    // console.log(l + ' ' + l.length);
    // console.log(f + ' ' + f.length);
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

    return [<span>{line2}</span>];
}
// DefaultGroups.defaultProps = {
//     showActions: true,
// };

DefaultGroups.propTypes = {
    mtgConfig: PropTypes.object.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    // deleteDefGroup: PropTypes.func.isRequired,
    // showActions: PropTypes.bool,
};

// const mapStateToProps = (state) => ({
//     auth: state.auth,
// });
export default DefaultGroups;
// export default connect(mapStateToProps, { deleteDefGroup })(DefaultGroups);
