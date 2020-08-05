import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 dígitos')
    .required('Senha obrigatória'),
});

interface SubmitProps {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { register, setValue, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const onSubmit = async (user: SubmitProps) => {
    try {
      await api.post('/users', user);

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação',
      );

      navigation.goBack();
    } catch {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer cadastro, tente novamente',
      );
    }
  };

  console.log(errors);

  useEffect(() => {
    register({ name: 'name' });
    register({ name: 'email' });
    register({ name: 'password' });
  }, [register]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Input
            autoCapitalize="words"
            name="name"
            icon="user"
            placeholder="Nome"
            handleChangeValue={setValue}
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current?.focus()}
            errors={errors}
          />
          <Input
            ref={emailInputRef}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            name="email"
            icon="mail"
            placeholder="E-mail"
            handleChangeValue={setValue}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            errors={errors}
          />
          <Input
            ref={passwordInputRef}
            name="password"
            icon="lock"
            placeholder="Senha"
            handleChangeValue={setValue}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit(onSubmit)}
            errors={errors}
          />

          <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
        </Container>
      </ScrollView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
