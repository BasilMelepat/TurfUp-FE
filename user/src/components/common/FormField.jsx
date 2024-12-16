import React, { useState } from 'react';
import { Mail, Lock, EyeIcon, EyeOffIcon } from 'lucide-react';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  register, 
  error, 
  icon: Icon = Mail,
  showPasswordToggle = false,
  placeholder,
  className = '',
  ...rest 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type={showPasswordToggle && showPassword ? 'text' : type}
          placeholder={placeholder || name}
          className={`
            input input-bordered w-full pl-10
            ${showPasswordToggle ? 'pr-10' : ''}
            ${error ? 'input-error' : ''}
            ${className}
          `}
          {...register(name)}
          {...rest}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-error text-xs mt-1">{error.message}</span>}
    </div>
  );
};

export default FormField;