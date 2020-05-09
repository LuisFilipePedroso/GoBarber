import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';

import { Form, Input, Button } from '../../components/Form';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SubmitProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('E-mail obrigatório'),
    password: Yup.string().required('Senha obrigatória'),
  });

  const handleSubmit = useCallback(
    async ({ email, password }: SubmitProps) => {
      try {
        await signIn({ email, password });
        history.push('/dashboard');
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />

          <Form onSubmit={handleSubmit} schema={schema}>
            <h1>Faça seu logon</h1>

            <Input
              name="email"
              placeholder="E-mail"
              icon={FiMail}
              autoComplete="off"
            />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
              autoComplete="off"
            />

            <Button type="submit">Entrar</Button>

            <Link to="signup">Esqueci minha senha</Link>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
