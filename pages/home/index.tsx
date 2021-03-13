import React,  { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { AuthContext } from '../../context'

const Home = () => {
  let localToken;
  const [userList, setUserList] = useState([])
  const [productList, setProductList] = useState([])
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const auth = (user.role === 'admin')

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users')
      setUserList(response.data)
    } catch (erro) {
      throw new Error(`Error while fetching`)
    }
  }

  const fetchProductList = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
      }
      const response = await axios.get('http://localhost:4000/beers', { headers: headers })
      setProductList(response.data)
    } catch (error) {
      throw new Error(`Error while fetching`)
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken) {
      fetchUserList()
      fetchProductList()
    } else {
      router.push('/login')
    }
  }, [localToken])

  return (
    <div>
      <p>Número de usuários: {userList.length}</p>
      <p>Número de produtos: {productList.length}</p>
      {auth ?
        <Link href='/users'>
          <a>Ir para Lista de Usuários</a>
        </Link>
      : ''
      }
    </div>
  )
}

export default Home