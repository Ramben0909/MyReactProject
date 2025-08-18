import React from 'react'
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
    };

const Spinner = ({loading}) => {
  return (
    <div>
      <ClipLoader
        color="red"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Spinner
