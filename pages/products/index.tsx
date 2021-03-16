import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { decodeToken } from 'react-jwt'
import { toast } from 'react-toastify';
import { NextPage } from 'next'

import { AuthContext } from '../../context'
import Layout from '../../components/Layout'
import { ProductData } from '../../types/products'


import * as S from './styles'

const Products: NextPage = () => {
  let localToken: string;
  const router = useRouter()
  const { setUser, user } = useContext(AuthContext)
  const [productList, setProductList] = useState<ProductData[]>([])
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
      toast.success('Produto removido com sucesso!')
      fetchProductList()
    } catch (erro) {
      toast.success('Erro ao remover o produto')
      console.log(erro)
    }
  }, [localToken])

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId: number = decodeToken(localToken).sub
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
        {productList.map((product: ProductData) => (
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