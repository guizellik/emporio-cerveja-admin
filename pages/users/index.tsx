import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { decodeToken } from 'react-jwt'
import Link from 'next/link'

import { AuthContext } from '../../context'
import UserData from '../../types/users'
import Layout from '../../components/Layout';

import * as S from './styles'


const Users = () => {
  let localToken
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)
  const [userList, setUserList] = useState([])

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
    <Layout>
      <S.UserWrapper>
        <h1>Lista de Usuários</h1>
        <S.UserList>
        {
          userList.map((item: UserData) => {
            return (
              <S.UserListItem key={item.id}>
                Nome: {item.name} - Role: {item.role}
                <HighlightOffIcon onClick={() => handleDelete(item.id)} />
              </S.UserListItem>
            )
          })
        }
        </S.UserList>
      </S.UserWrapper>
    </Layout>
  )
}

export default Users