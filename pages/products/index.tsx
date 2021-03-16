import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { decodeToken } from 'react-jwt'
import { toast } from 'react-toastify';

import { AuthContext } from '../../context'
import Layout from '../../components/Layout'

import * as S from './styles'

const Products = () => {
  let localToken
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)
  const [productList, setProductList] = useState([])
  const authCondition = (user?.role === 'admin')

  const fetchProductList = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
      }
      const response = await axios.get(`http://localhost:4000/beers/`, { headers: headers })
      setProductList(response.data)
    } catch (erro) {
      throw new Error(`Erro ao buscar a lista de produtos: ${erro}`)
    }
  }

  const handleDelete = useCallback(async (productToBeDeletedId) => {
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
      }
      await axios.delete(`http://localhost:4000/beers/${productToBeDeletedId}`, { headers: headers })
      toast('Produto apagado com sucesso!')
      fetchProductList()
    } catch (error) {
      throw new Error(`Erro ao deletar produto: ${error}`)
    }
  }, [localToken])

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId = decodeToken(localToken).sub
      axios.get(`http://localhost:4000/users/${userId}`).then(
        (response: any) => setUser(response.data)
      )
      fetchProductList()
    } else if (!localToken && !user) {
      router.push('/login')
    } else {
      fetchProductList()
    }
  }, [user])

  return (
    <Layout>
      <S.ProductWrapper>
        <S.Title>Lista de produtos</S.Title>
        {productList.map(product => (
          <S.ProductDetails key={product.id}>
            {product.title} - R$ {product.price}
            {authCondition ? <HighlightOffIcon onClick={() => handleDelete(product.id)}/> : ''}
          </S.ProductDetails>
        ))}
      </S.ProductWrapper>
    </Layout>
  )
}

export default Products