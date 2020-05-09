import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { Form, Input, Button } from '../../components/Form';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SubmitProps {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('E-mail obrigatório'),
    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  });

  const handleSubmit = useCallback(
    async (user: SubmitProps) => {
      try {
        await api.post('/users', user);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form onSubmit={handleSubmit} schema={schema}>
            <h1>Faça seu cadastro</h1>

            <Input
              name="name"
              placeholder="Nome"
              icon={FiUser}
              autoComplete="off"
            />
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

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
