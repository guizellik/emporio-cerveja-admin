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
  const authCondition = (user?.role === 'admin')

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

  const handleLogout = () => {
    localStorage.removeItem(localToken);
    router.push('/login')
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (!localToken || !user) {
      router.push('/login')
    } else {
      fetchUserList()
      fetchProductList()
    }
  }, [localToken])

  return (
    <div>
      <p>Número de usuários: {userList.length}</p>
      <p>Número de produtos: {productList.length}</p>
      {authCondition ?
        <Link href='/users'>
          <a>Ir para Lista de Usuários</a>
        </Link>
      : ''
      }
      <Link href='/products'>
        <a>Ir para página de produtos</a>
      </Link>
      <button onClick={handleLogout}>Deslogar</button>
    </div>
  )
}

export default Home