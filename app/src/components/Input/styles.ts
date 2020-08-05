import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  hasErrors: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  border-width: 2px;
  border-color: #232129;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  ${(props) =>
    props.hasErrors &&
    css`
      border-color: #c53030;
    `}
`;

export const InputIcon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Error = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-bottom: 8px;
`;

export const ErrorText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
`;
