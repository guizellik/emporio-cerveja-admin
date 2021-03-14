import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { decodeToken } from 'react-jwt'
import Link from 'next/link'


import { AuthContext } from '../../context'

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
    <div>
      <h1>Sou a página de produtos</h1>
      {productList.map(product => (
        <p key={product.id}>
          {product.title} - {product.price}
          { authCondition ? <DeleteForeverIcon onClick={() => handleDelete(product.id)}/> : '' }
        </p>
      ))}
      <Link href='/registerProduct'>
          <a>Cadastrar Produtos</a>
      </Link>
      <Link href='/home'>
          <a>Voltar para Home</a>
      </Link>
    </div>
  )
}

export default Products