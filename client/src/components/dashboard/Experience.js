import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
const Experience = ({ experience }) => {
  const experiences = experience.map((experience) => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td className='hide-sm'>{experience.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{experience.from}</Moment> -{' '}
        {experience.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{experience.to}</Moment>
        )}
      </td>
      <td>
        {/** TODO: onClick function */}
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect()(Experience);
