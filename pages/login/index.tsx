import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NextPage } from 'next'

import { AuthContext } from '../../context'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Logo from '../../assets/logo.png'
import { LoginPayload } from '../../types/users'

import * as S from './styles'

const Login: NextPage = () => {
  const { setUser } = useContext(AuthContext)
  const router = useRouter()
  const loginInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    const User: LoginPayload = {
      email: loginInputRef.current?.value,
      password: passwordInputRef.current?.value
    }

    try {
      const response = await axios.post('http://localhost:4000/login', User)
      localStorage.setItem("token", response.data.accessToken)
      const userId: number = decodeToken(response.data.accessToken).sub
      const userData = await axios.get(`http://localhost:4000/users/${userId}`)
      setUser(userData.data)
      router.push('/home')
    } catch (erro) {
      toast.error('Usuário não identificado')
      console.log(erro)
    }
  }

  return (
    <S.LoginLayout>
      <Card>
        <S.LoginWrapper>
          <img src={Logo} alt="logo emporio"/>
          <S.InputWrapper>
            <S.InputText
            type='text'
            ref={loginInputRef}
            placeholder='Informe seu email'
            >
            </S.InputText>
            <S.InputText
            type='password'
            ref={passwordInputRef}
            placeholder='Informe sua senha'
            >
            </S.InputText>
          </S.InputWrapper>
          <Button backgroundColor='#FFC300' onClick={handleLogin}>
            Login
          </Button>
        </S.LoginWrapper>
      </Card>
    </S.LoginLayout>
  )
}

export default Login
