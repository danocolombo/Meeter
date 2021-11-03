import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
const initialState = {
  gender: '',
  title: '',
  location: '',
  facilitator: '',
};
const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState(initialState);
  const {
    gender,
    title,
    location,
    facilitator,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Add A Default Group</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ formData });
          gender('');
          title('');
          location('');
          facilitator('');
        }}
      >
        <div className='DefaultGroupFormBox'>
            <select
                key='2'
                className='DGF-Gender'
                name='gender'
                value={gender}
                onChange={(e) => onChange(e)}>
                <option value='0'>** Select Gender</option>
                <option value='f'>Women's</option>
                <option value='m'>Men's</option>
                <option value='x'>Mixed</option>
            </select>
            <input
                type='text'
                className='DGF-Title'
                placeholder='Title'
                name='title'
                value={title}
                onChange={onChange}
                required
            />
            <input
              type='text'
              className='DGF-Location'
              placeholder='Location'
              name='location'
              value={location}
              onChange={onChange}
            />
            <input
              type='text'
              className='DGF-Facilitator'
              placeholder='Facilitator'
              name='facilitator'
              value={facilitator}
              onChange={onChange}
            />
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Add Group' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
