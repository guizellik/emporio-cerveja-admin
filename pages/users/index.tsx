import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { decodeToken } from 'react-jwt'
import { toast } from 'react-toastify'
import { NextPage } from 'next'

import { AuthContext } from '../../context'
import { UserData } from '../../types/users'
import Layout from '../../components/Layout';

import * as S from './styles'


const Users: NextPage = () => {
  let localToken: string;
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)
  const [userList, setUserList] = useState([])

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users?role=admin&role=editor')
      setUserList(response.data)
    } catch (erro) {
      toast.error('Ocorreu um erro ao buscar os usuários')
      console.log(erro)
    }
  }

  const handleDelete = async (userToBeDeletedId: number) => {
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
      }
      await axios.delete(`http://localhost:4000/users/${userToBeDeletedId}`, { headers: headers })
      toast.success(`Usuário removido com sucesso`)
      fetchUserList()
    } catch (erro) {
      toast.error(`Erro ao remover usuário`)
      console.log(erro)
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId: number = decodeToken(localToken).sub
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
                Nome: {item.name} - Nível de Acesso: {item.role}
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