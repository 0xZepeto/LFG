import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.css';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'mdt-button',
    `mdt-button--${variant}`,
    `mdt-button--${size}`,
    disabled && 'mdt-button--disabled',
    loading && 'mdt-button--loading',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <span className="mdt-button__spinner">
          <span className="mdt-button__spinner-circle"></span>
        </span>
      )}
      <span className="mdt-button__content">{children}</span>
    </button>
  );
};

export default Button;
