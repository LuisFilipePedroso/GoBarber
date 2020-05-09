import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { FieldErrors } from 'react-hook-form';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  register?: any;
  getValue?: any;
  errors?: FieldErrors<any>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  register,
  getValue,
  errors,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!getValue(name));
  }, [getValue, name]);

  return (
    <Container
      hasErrors={!!errors && errors[name]}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        ref={register}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      {errors && errors[name] && (
        <Error title={errors[name]?.message}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
