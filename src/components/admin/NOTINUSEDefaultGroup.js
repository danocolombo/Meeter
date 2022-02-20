import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDefGroup } from '../../actions/admin';
import './config.styles.scss';
const DefaultGroups = ({
    deleteDefGroup,
    auth,
    defGroup: { groupId, gender, title, location, facilitator },
    showActions,
    client,
    history,
}) => {
    // const [clientInfo, setClientInfo] = useState(null);

    return (
        <div className={'config-component__wrapper'}>
            {gender === 'f' && (
                <div className={'config-component__first-row'}>
                    <div className={'config-component__label-style'}>
                        Women's{' '}
                    </div>
                    <div className={'config-component__value-style'}>
                        {title}
                    </div>
                </div>
            )}
            {gender === 'm' && (
                <div className={'config-component__first-row'}>
                    <div className={'config-component__label-style'}>Men's</div>
                    <div className={'config-component__value-style'}>
                        {title}
                    </div>
                </div>
            )}
            {gender === 'x' && (
                <div className={'config-component__first-row'}>
                    <div>{title}</div>
                </div>
            )}
            <div className='config-component__first-row'>
                <div>{location}</div>
            </div>
            <div className='config-component__first-row'>
                <div>{facilitator}</div>
            </div>
            <div className={'config-component__icon-row'}>
                <div className={'config-component__edit-style'}>
                    <i className='fas fa-pen'></i>
                </div>
                <div className={'config-component__delete-style'}>
                    <i
                        className={'fa fa-trash'}
                        onClick={() => deleteDefGroup(groupId, client, history)}
                    ></i>
                </div>
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
};

DefaultGroups.defaultProps = {
    showActions: true,
};

DefaultGroups.propTypes = {
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

export default connect(mapStateToProps, { deleteDefGroup })(DefaultGroups);
