import React from 'react';
import './input.scss';

const InputChecks = ({ id, type, label, name, className, error, ...rest }) => {
  return (
    <div className={`${type}-field ${className} `}>
        <label  className="label gap-3 justify-start cursor-pointer p-0 inputLabel">
          <input 
            type={type} 
            name={id} 
            className={`${type} checked:bg-base-300 checkbox-base-300`} 
            {...rest} // Spread remaining props here
          />
          <span className="label-text text-base-300">{label}</span>
        </label>
        {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default InputChecks;
