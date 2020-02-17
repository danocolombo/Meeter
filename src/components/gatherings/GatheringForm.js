import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGathering } from '../../actions/gathering';

const GatheringForm = ({ createGathering, history }) => {
  const [formData, setFormData] = useState({
    meetingDate: '',
    facilitator: '',
    meetingType: '',
    title: '',
    teacher: '',
    meal: '',
    mealCoordinator: '',
    mealCount: 0,
    attendance: 0,
    donations: 0,
    notes: ''
  });
  const {
    meetingDate,
    facilitator,
    meetingType,
    title,
    teacher,
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
    console.log('submitting');
    createGathering(formData, history);
  };
  // useEffect(() => {
  //   getCurrentProfile();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getCurrentProfile]);

  // return loading && profile === null ? (
  //   <Redirect to="/dashboard" />
  // ) : (
  return (
    <Fragment>
      <h1 className="large text-primary">Meeting Definition</h1>
      <p className="lead">
      <i className="far fa-calendar-alt"/>{'  '}Provide details of the meeting below
      </p>
      <small>** = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <h4>Meeting Date **</h4>
          <input type="date" name="meetingDate" />
        </div>
        <div className="form-group">
          <select name="faciliator">
            <option value="0">* Select who is facilitating the meeting</option>
            <option value="5e462c736b22679b2dbae981">Dano Colombo</option>
            <option value="5e462caa6b22679b2dbae982">Joni Colombo</option>
            <option value="5e462cc66b22679b2dbae983">Bubba Gordy</option>
            <option value="5e462cd46b22679b2dbae984">Bryan Donaldson</option>
            <option value="0">TBD</option>
          </select>
          <small className="form-text">
            Person accountable & responsible for the meeting.
          </small>
        </div>
        <div className="form-group">
          <select name="meetingType">
            <option value="0">** Select the type of meeting</option>
            <option value="Lesson">Lesson</option>
            <option value="Testimony">Testimony</option>
            <option value="Special">Special</option>
            <option value="Teaching">Teaching</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">What kind of meeting is this?</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Lesson title" name="headline" />
          <small className="form-text" name="headline-hint">
            Lesson / Testimony name
          </small>
        </div>
        <div className="form-group">
          <select name="teacher">
            <option value="0">* Select who is teaching the lesson</option>
            <option value="5e462c736b22679b2dbae981">Dano Colombo</option>
            <option value="5e462caa6b22679b2dbae982">Joni Colombo</option>
            <option value="5e462cc66b22679b2dbae983">Bubba Gordy</option>
            <option value="5e462cd46b22679b2dbae984">Bryan Donaldson</option>
            <option value="0">TBD</option>
          </select>
          <small className="form-text">Person teaching the lesson</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Meal plans" name="meal" />
          <small className="form-text">Whats for dinner?</small>
        </div>
        <div className="form-group">
          <select name="mealCoordinator">
            <option value="0">* Select who coordinating the meal</option>
            <option value="5e462c736b22679b2dbae981">Dano Colombo</option>
            <option value="5e462caa6b22679b2dbae982">Joni Colombo</option>
            <option value="5e462cc66b22679b2dbae983">Bubba Gordy</option>
            <option value="5e462cd46b22679b2dbae984">Bryan Donaldson</option>
            <option value="0">TBD</option>
          </select>
          <small className="form-text">
            Person accountable & responsible for meal
          </small>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="mealCount"
            name="mealCount"
            min="0"
            max="100"
          />
          <small className="form-text">How many ate dinner?</small>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="attendance"
            name="attendance"
            min="0"
            max="200"
          />
          <small className="form-text">How many attended large group?</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="$$" name="donations" />
          <small className="form-text">Donations received</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description and notes for meeting"
            name="notes"
          ></textarea>
          <small className="form-text">Things to remember</small>
        </div>
      
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

GatheringForm.propTypes = {
  createGathering: PropTypes.func.isRequired
  // getCurrentProfile: PropTypes.func.isRequired
  // profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  // profile: state.profile
});
export default connect(mapStateToProps, { createGathering })(
  withRouter(GatheringForm)
);
