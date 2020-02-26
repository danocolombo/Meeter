import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGathering, getGathering } from '../../actions/gathering';

const initialState = {
    _id: '',
    meetingDate: '',
    facilitator: '',
    meetingType: '',
    supportRole: '',
    title: '',
    meal: '',
    mealCoordinator: '',
    mealCount: 0,
    attendance: 0,
    donations: 0,
    notes: ''
};

const EditGathering = ({
    gathering: { gathering, loading },
    createGathering,
    getGathering,
    match,
    history
}) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!gathering) getGathering(match.params.id);
        if (!loading) {
            const gatheringData = { ...initialState };
            for (const key in gathering) {
                if (key in gatheringData) gatheringData[key] = gathering[key];
            }
            setFormData(gatheringData);
        }
    }, [loading, getGathering, gathering]);

    const {
        _id,
        meetingDate,
        facilitator,
        meetingType,
        supportRole,
        title,
        meal,
        mealCoordinator,
        mealCount,
        attendance,
        donations,
        notes
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createGathering(formData, history, true);
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Your Meeting</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Have at it...
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={onSubmit}>
                <div>
                    <h4>Meeting Date **</h4>
                    <input
                        className='mDate'
                        type='date'
                        name='meetingDate'
                        value={meetingDate.slice(0, 10)}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <h4>Meeting Type **</h4>
                    <select
                        name='meetingType'
                        value={meetingType}
                        onChange={e => onChange(e)}
                    >
                        <option value='0'>** Select the type of meeting</option>
                        <option value='Lesson'>Lesson</option>
                        <option value='Testimony'>Testimony</option>
                        <option value='Special'>Special</option>
                        <option value='Teaching'>Teaching</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        What kind of meeting is this?
                    </small>
                </div>
                <div className='form-group'>
                    {displayTitle()}
                    <input
                        type='text'
                        placeholder={diplayTitleHint()}
                        name='title'
                        value={title}
                        onChange={onChange}
                    />
                    <small className='form-text'>{diplayTitleSubtitle()}</small>
                </div>
                <div className='form-group'>{displayTeacher()}</div>
                {/* <div className='form-group'>
                    <select name='status' value={status} onChange={onChange}>
                        <option>* Select Professional Status</option>
                        <option value='Developer'>Developer</option>
                        <option value='Junior Developer'>
                            Junior Developer
                        </option>
                        <option value='Senior Developer'>
                            Senior Developer
                        </option>
                        <option value='Manager'>Manager</option>
                        <option value='Student or Learning'>
                            Student or Learning
                        </option>
                        <option value='Instructor'>
                            Instructor or Teacher
                        </option>
                        <option value='Intern'>Intern</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        Give us an idea of where you are at in your career
                    </small>
                </div> */}
                {/* <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Company'
                        name='company'
                        value={company}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Website'
                        name='website'
                        value={website}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Could be your own or a company website
                    </small>
                </div> */}
                {/* <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={location}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Skills'
                        name='skills'
                        value={skills}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                    </small>
                </div> */}
                {/* <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Github Username'
                        name='githubusername'
                        value={githubusername}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        If you want your latest repos and a Github link, include
                        your username
                    </small>
                </div>
                <div className='form-group'>
                    <textarea
                        placeholder='A short bio of yourself'
                        name='bio'
                        value={bio}
                        onChange={onChange}
                    />
                    <small className='form-text'>
                        Tell us a little about yourself
                    </small>
                </div>

                <div className='my-2'>
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type='button'
                        className='btn btn-light'
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div> */}

                {/* {displaySocialInputs && (
                    <Fragment>
                        <div className='form-group social-input'>
                            <i className='fab fa-twitter fa-2x' />
                            <input
                                type='text'
                                placeholder='Twitter URL'
                                name='twitter'
                                value={twitter}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-facebook fa-2x' />
                            <input
                                type='text'
                                placeholder='Facebook URL'
                                name='facebook'
                                value={facebook}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-youtube fa-2x' />
                            <input
                                type='text'
                                placeholder='YouTube URL'
                                name='youtube'
                                value={youtube}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-linkedin fa-2x' />
                            <input
                                type='text'
                                placeholder='Linkedin URL'
                                name='linkedin'
                                value={linkedin}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group social-input'>
                            <i className='fab fa-instagram fa-2x' />
                            <input
                                type='text'
                                placeholder='Instagram URL'
                                name='instagram'
                                value={instagram}
                                onChange={onChange}
                            />
                        </div>
                    </Fragment>
                )} */}

                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
    function displayTitle() {
        switch (meetingType) {
            case 'Lesson':
                return <h4>Lesson</h4>;
                break;
            case 'Testimony':
                return <h4>Who's Testimony?</h4>;
                break;
            default:
                return <h4>Description</h4>;
        }
    }
    function diplayTitleHint() {
        switch (meetingType) {
            case 'Lesson':
                return 'Teacher?';
                break;
            case 'Testimony':
                return "Who's testimony?";
                break;
            default:
                return <h4>Description</h4>;
        }
    }
    function diplayTitleSubtitle() {
        switch (meetingType) {
            case 'Lesson':
                return 'Which lesson is being given?';
                break;
            case 'Testimony':
                return "Who's testimony is being shared?";
                break;
            default:
                return 'Please provide a description of the event';
        }
    }
    function displayTeacher() {
        if (meetingType === 'Lesson') {
            return [
                <h4>Teacher</h4>,
                <input
                    type='text'
                    placeholder='teacher...'
                    name='title'
                    value={supportRole}
                    onChange={onChange}
                />,
                <small className='form-text'>Who taught the lesson?</small>
            ];
        }
        return null;
    }
};

EditGathering.propTypes = {
    createGathering: PropTypes.func.isRequired,
    getGathering: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    gathering: state.gathering
});

export default connect(mapStateToProps, { createGathering, getGathering })(
    withRouter(EditGathering)
);
