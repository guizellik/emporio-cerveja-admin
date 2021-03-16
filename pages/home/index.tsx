import React,  { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { decodeToken } from 'react-jwt'
import { NextPage } from 'next'
import { toast } from 'react-toastify'

import { AuthContext } from '../../context'
import Layout from '../../components/Layout'
import Card from '../../components/Card'

import * as S from './styles'

const Home: NextPage = () => {
  let localToken: string;
  const [userListSize, setUserListSize] = useState<number>(0)
  const [productListSize, setProductListSize] = useState<number>(0)
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)

  const fetchUserListSize = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users')
      setUserListSize(response.data.length)
    } catch (erro) {
      toast.error('Erro ao buscar número de usuários')
      console.log(erro)
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
      toast.error('Erro ao buscar número de produtos')
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId: number = decodeToken(localToken).sub
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
          <Card title='Quantidade de Usuários Cadastrados'>
            <S.CardNumber>{userListSize}</S.CardNumber>
          </Card>
          <Card title='Quantidade de Produtos Cadastrados'>
          <S.CardNumber>{productListSize}</S.CardNumber>
          </Card>
        </S.Row>
      </S.HomeWrapper>
    </Layout>
  )
}

export default Home