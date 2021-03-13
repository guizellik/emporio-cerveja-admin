import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { AuthContext } from '../../context'
import UserData from '../../types/users'


const Users = () => {
  let localToken
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && user.role === 'admin') {
    } else {
      router.push('/home')
    }
  })

  useEffect(() => {
    const handleUserList = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users?role=admin&role=editor')
        setUserList(response.data)
      } catch (erro) {
        alert("Ocorreu um erro ao buscar os usuários")
      }
    }
    handleUserList()
  },[])

  return (
    <div>
      <p>Lista de Usuários</p>
      {
        userList.map((item: UserData) => {
          return <li key={item.id}>{item.name} - {item.role}</li>
        })
      }
    </div>
  )
}

export default Users