import axios from 'axios'
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { NextPage } from 'next'

import { AuthContext } from '../../context'
import { decodeToken } from 'react-jwt'
import { RegisterUserPayload } from '../../types/users'
import Layout from '../../components/Layout'
import Button from '../../components/Button'


import * as S from './styles'


const RegisterUser: NextPage = () => {
  let localToken: string;

  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const roleSelect = useRef<HTMLSelectElement>(null)

  const { setUser, user } = useContext(AuthContext)
  const router = useRouter()


  const handleRegisterUser = async () => {
    const formUserValidation = nameInput.current?.value &&
    emailInput.current?.value &&
    passwordInput.current?.value &&
    roleSelect.current?.value

    if (formUserValidation) {
      const newUser: RegisterUserPayload  = {
        name: nameInput.current?.value,
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
        role: roleSelect.current?.value
      }
      try {
        await axios.post('http://localhost:4000/users/', newUser)
        toast.success('Usuário cadastrado com sucesso!')
      } catch (erro) {
        toast.error(`Não foi possível cadastrar usuário`)
        console.log(erro)
      }
    } else {
      toast.error('Preencha todos os campos')
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId = decodeToken(localToken).sub
      axios.get(`http://localhost:4000/users/${userId}`).then(
        (response: any) => setUser(response.data)
      )
    } else if (!localToken && !user) {
      router.push('/login')
    } else if (localToken && user && user.role !== 'admin') {
      router.push('/home')
    }
  }, [user])

  return (
    <Layout>
      <S.RegisterUserWrapper>
        <S.Title>Cadastro de Usuário</S.Title>
          <S.RegisterUserInput type='text' ref={nameInput} placeholder='Nome' required></S.RegisterUserInput>
          <S.RegisterUserInput type='email' ref={emailInput} placeholder='E-mail' required></S.RegisterUserInput>
          <S.RegisterUserInput type='password' ref={passwordInput} placeholder='Senha' required></S.RegisterUserInput>
          <S.RegisterUserLabel>Nível de acesso</S.RegisterUserLabel>
          <S.RegisterUserSelect ref={roleSelect} name="role" id="role">
            <option value="admin">admin</option>
            <option value="editor">editor</option>
          </S.RegisterUserSelect>
          <Button backgroundColor='#F8A849'
          onClick={handleRegisterUser}>Cadastrar</Button>
      </S.RegisterUserWrapper>

    </Layout>
  )
}

export default RegisterUser