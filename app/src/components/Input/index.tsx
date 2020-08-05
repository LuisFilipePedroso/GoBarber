import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, InputIcon, TextInput, Error, ErrorText } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  handleChangeValue: any;
  errors?: FieldErrors<any>;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, handleChangeValue, errors, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInpuBlur = useCallback(() => {
    setIsFocused(false);

    if (inputValue) {
      setIsFilled(true);
    }
  }, [inputValue]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      handleChangeValue(name, value, true);
    },
    [handleChangeValue, name],
  );

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  const color = useMemo(() => {
    if (isFocused || isFilled) {
      return '#ff9000';
    }

    return '#666360';
  }, [errors, isFilled, isFocused, name]);

  return (
    <>
      <Container isFocused={isFocused} hasError={!!errors[name]}>
        <InputIcon name={icon} size={20} color={color} />
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          onChangeText={(text) => handleInputChange(text)}
          onFocus={handleInputFocus}
          onBlur={handleInpuBlur}
          {...rest}
        />
        {errors[name] && <Icon name="alert-circle" size={20} color="#c53030" />}
      </Container>
      <Error>
        <ErrorText>{errors[name]?.message}</ErrorText>
      </Error>
    </>
  );
};

export default forwardRef(Input);
