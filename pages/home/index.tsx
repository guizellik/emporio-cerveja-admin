import React,  { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { decodeToken } from 'react-jwt'

import { AuthContext } from '../../context'
import Layout from '../../components/Layout'
import Card from '../../components/Card'

import * as S from './styles'

const Home = () => {
  let localToken;
  const [userListSize, setUserListSize] = useState(0)
  const [productListSize, setProductListSize] = useState(0)
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)
  const authCondition = (user?.role === 'admin')

  const fetchUserListSize = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users')
      setUserListSize(response.data.length)
    } catch (err) {
      throw new Error(`Erro ao buscar número de usuários: ${err}`)
    }
  }

  const fetchProductListSize = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
      }
      const response = await axios.get('http://localhost:4000/beers', { headers: headers })
      setProductListSize(response.data.length)
    } catch (err) {
      throw new Error(`Erro ao buscar número de produtos: ${err}`)
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId = decodeToken(localToken).sub
      axios.get(`http://localhost:4000/users/${userId}`).then(
        (response: any) => setUser(response.data)
      )
      fetchUserListSize()
      fetchProductListSize()
    }
    else if (!localToken || !user) {
      router.push('/login')
    } else {
      fetchUserListSize()
      fetchProductListSize()
    }
  }, [localToken])

  return (
    <Layout>
      <S.HomeWrapper>
        <S.Row>
          <Card title='Número de Usuários Cadastrados'>
            {userListSize}
          </Card>
          <Card title='Número de Produtos Cadastrados'>
            {productListSize}
          </Card>
        </S.Row>
      </S.HomeWrapper>
    </Layout>
  )
}

export default Home