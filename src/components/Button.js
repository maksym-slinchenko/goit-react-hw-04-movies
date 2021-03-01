import React from 'react';
import PropTypes from 'prop-types';

function Button({ buttonName, callBack }) {
  return (
    <>
      <button type="button" className="Button" onClick={callBack}>
        {buttonName}
      </button>{' '}
    </>
  );
}

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default Button;
