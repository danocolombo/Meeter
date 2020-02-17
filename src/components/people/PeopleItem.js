import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PeopleItem = ({ person: { _id, name, email, phone, status } }) => {
  return (
    <div className="profile bg-light">
      <div>
        test
        {/* <h2>{name}</h2>
        <p>
          {status} {email && <span> at {email}</span>}
        </p>
        <p className="my-1">{phone && <span>{phone}</span>}</p>
        <Link to={`/people/${_id}`} className="btn btn-primary">
          View Person
        </Link> */}
      </div>
      {/* <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

PeopleItem.propTypes = {
  people: PropTypes.object.isRequired
};

export default PeopleItem;
