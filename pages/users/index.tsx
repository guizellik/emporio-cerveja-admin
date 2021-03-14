import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { decodeToken } from 'react-jwt'
import Link from 'next/link'

import { AuthContext } from '../../context'
import UserData from '../../types/users'


const Users = () => {
  let localToken
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)
  const [userList, setUserList] = useState([])
  const authCondition = (user?.role === 'admin')

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users?role=admin&role=editor')
      setUserList(response.data)
    } catch (erro) {
      alert("Ocorreu um erro ao buscar os usuários")
    }
  }

  const handleDelete = async (userToBeDeletedId: number) => {
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
      }
      await axios.delete(`http://localhost:4000/users/${userToBeDeletedId}`, { headers: headers })
      fetchUserList()
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error}`)
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId = decodeToken(localToken).sub
      axios.get(`http://localhost:4000/users/${userId}`).then(
        (response: any) => setUser(response.data)
      )
      fetchUserList()
    } else if (!localToken && !user) {
      router.push('/login')
    } else if (localToken && user && user.role !== 'admin') {
      router.push('/home')
    } else {
      fetchUserList()
    }
  }, [user])

  return (
    <div>
      <p>Lista de Usuários</p>
      {
        userList.map((item: UserData) => {
          return (
            <li key={item.id}>
              {item.name} - {item.role}
              <DeleteForeverIcon onClick={() => handleDelete(item.id)} />
            </li>
          )
        })
      }
      {authCondition ?
        <Link href='/registerUser'>
          <a>Cadastrar Usuário</a>
        </Link>
      : ''
      }
      <Link href='/home'>
        <a>Voltar para Home</a>
      </Link>
    </div>
  )
}

export default Users