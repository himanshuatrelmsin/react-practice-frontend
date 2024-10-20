import { Fragment, useState } from 'react';
import './input.scss';

const Input = ({ id, label, inputSize, type, className, placeholder, error, usernameerror, ...rest }) => {
  const classes = `${inputSize || ''} ${className || ''}`;
  

  return (
    <Fragment>
      <div className="inputField">

        <div className="rounded-0 mb-4">
          <input
            type={type}
            id={id}
            autoComplete="off"
            className={`${classes} py-3 px-4 `}
            placeholder={placeholder}
            
            {...rest}
          />
          {error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            usernameerror && <div className="text-red-600">{usernameerror}</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Input;
