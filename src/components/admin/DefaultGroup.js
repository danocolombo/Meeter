import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteDefGroup } from '../../actions/admin';

const DefaultGroups = ({
    deleteDefGroup,
    auth,
    defGroup: { _id, gender, title, location, facilitator },
    showActions,
}) => (
    <Fragment>
        <div className={'adminDefaultGroupBox bg-white p my'}>
            {gender === 'f' && <div>women</div>}
            {gender === 'm' && <div>men</div>}
            {gender === 'x' && <div>mixed</div>}
            <div>{title}</div>
            <div>{location}</div>
            <div>{facilitator}</div>
            <div>
                {!auth.loading && (
                    <button
                        onClick={() => deleteDefGroup(_id)}
                        type='button'
                        className='btn btn-danger'
                    >
                        <i className='fas fa-times' />
                    </button>
                )}
            </div>
            {/* <table>
                <tr>
                    <td>{gender}</td>
                    <td>{title}</td>
                    <td>{location}</td>
                    <td>{facilitator}</td>
                    <td>
                        {!auth.loading && (
                            <button
                                onClick={() => deleteDefGroup(_id)}
                                type='button'
                                className='btn btn-danger'
                            >
                                <i className='fas fa-times' />
                            </button>
                        )}
                    </td>
                </tr>
            </table> */}
            {/* <div>Gender: {gender}</div>
            <div>Title: {title}</div>
            <div>Location: {location}</div>
            <div>Facilitator: {facilitator}</div> */}
            {/* <div>
                {showActions && (
                    <Fragment>
                        {!auth.loading && (
                            <button
                                onClick={() => deleteDefGroup(_id)}
                                type='button'
                                className='btn btn-danger'
                            >
                                <i className='fas fa-times' />
                            </button>
                        )}
                    </Fragment>
                )}
            </div> */}
        </div>
    </Fragment>
    // <div className='post bg-white p-1 my-1'>
    //   <div>
    //     <Link to={`/profile/${user}`}>
    //       <img className='round-img' src={avatar} alt='' />
    //       <h4>{name}</h4>
    //     </Link>
    //   </div>
    //   <div>
    //     <p className='my-1'>{text}</p>
    //     <p className='post-date'>
    //       Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
    //     </p>

    //     {showActions && (
    //       <Fragment>
    //         <button
    //           onClick={() => addLike(_id)}
    //           type='button'
    //           className='btn btn-light'
    //         >
    //           <i className='fas fa-thumbs-up' />{' '}
    //           <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
    //         </button>
    //         <button
    //           onClick={() => removeLike(_id)}
    //           type='button'
    //           className='btn btn-light'
    //         >
    //           <i className='fas fa-thumbs-down' />
    //         </button>
    //         <Link to={`/posts/${_id}`} className='btn btn-primary'>
    //           Discussion{' '}
    //           {comments.length > 0 && (
    //             <span className='comment-count'>{comments.length}</span>
    //           )}
    //         </Link>
    //         {!auth.loading && user === auth.user._id && (
    //           <button
    //             onClick={() => deletePost(_id)}
    //             type='button'
    //             className='btn btn-danger'
    //           >
    //             <i className='fas fa-times' />
    //           </button>
    //         )}
    //       </Fragment>
    //     )}
    //   </div>
    // </div>
);

DefaultGroups.defaultProps = {
    showActions: true,
};

DefaultGroups.propTypes = {
    defGroup: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteDefGroup: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteDefGroup })(DefaultGroups);
