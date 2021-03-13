import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { decodeToken } from 'react-jwt'
import axios from 'axios'

import { AuthContext } from '../../context'

import * as S from './styles'

const Login = () => {
  const { setUser } = useContext(AuthContext)
  const router = useRouter()
  const loginInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    const User = {
      email: loginInputRef.current?.value,
      password: passwordInputRef.current?.value
    }

    try {
      const response = await axios.post('http://localhost:4000/login', User)
      localStorage.setItem("token", response.data.accessToken)
      const userId = decodeToken(response.data.accessToken).sub
      const userData = await axios.get(`http://localhost:4000/users/${userId}`)
      setUser(userData.data)
      router.push('/home')
    } catch (erro) {
      alert(`${erro} - Usuário não identificado`)
    }
  }

  return (
    <S.LoginWrapper>
      Login: <input type='text' ref={loginInputRef} placeholder='Digite o seu login aqui...'></input>
      Password: <input type='password' ref={passwordInputRef} placeholder='Digite a sua senha aqui...'></input>
      <button onClick={handleLogin}>Login</button>
    </S.LoginWrapper>
  )
}

export default Login
