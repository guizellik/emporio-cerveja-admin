import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'


import { AuthContext } from '../../context'
import { decodeToken } from 'react-jwt'


const RegisterUser = () => {
  let localToken

  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const roleSelect = useRef<HTMLSelectElement>(null)

  const { setUser, user } = useContext(AuthContext)
  const authCondition = (user?.role === 'admin')
  const router = useRouter()


  const handleRegisterUser = async () => {
    const newUser = {
      name: nameInput.current?.value,
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
      role: roleSelect.current?.value
    }
    try {
      const register = await axios.post('http://localhost:4000/users/', newUser)
      alert('Usuário cadastrado com sucesso!')
    } catch (erro) {
      alert(`${erro} - Não foi possível cadastrar usuário`)
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
    <div>
        <input type='text' ref={nameInput} placeholder='Digite seu nome aqui...' required></input>
        <input type='email' ref={emailInput} placeholder='Digite seu e-mail aqui...' required></input>
        <input type='password' ref={passwordInput} placeholder='Digite sua senha aqui...' required></input>
        <label >Escolha um role: </label>
        <select ref={roleSelect} name="role" id="role">
          <option value="admin">admin</option>
          <option value="editor">editor</option>
        </select>
        <button onClick={handleRegisterUser}>Cadastrar</button>
        { authCondition ?
        <Link href='/users'>
          <a>Voltar para página de Usuários</a>
        </Link>
        : ''}
        <Link href='/home'>
          <a>Voltar para Home</a>
        </Link>
    </div>
  )
}

export default RegisterUser