import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// middleware
// 1. make sure its not null
// 2. make sure array's length is not equal to 0 ( i dont wanna output anything if the array is 0)
// 3. map through the alerts ( returns a JSX for each alert )
//    a. add a key (make sure theres a unique key) // alert.id
//    b. alertType -> dynamic using styles className={`alert alert-${ }`}

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
Alert.propTypes = {
  alerts: PropTypes.array.isRequired, // alerts is an array
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
