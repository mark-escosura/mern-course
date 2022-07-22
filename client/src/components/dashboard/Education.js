import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
const Education = ({ education }) => {
  const educations = education.map((education) => (
    <tr key={education._id}>
      <td>{education.school}</td>
      <td className='hide-sm'>{education.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{education.from}</Moment> -{' '}
        {education.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{education.to}</Moment>
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
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default connect()(Education);
