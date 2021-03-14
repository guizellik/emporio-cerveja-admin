import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'


import { AuthContext } from '../../context'
import { decodeToken } from 'react-jwt'


const RegisterProduct = () => {
  let localToken

  const titleInput = useRef<HTMLInputElement>(null)
  const priceInput = useRef<HTMLInputElement>(null)
  const descriptionInput = useRef<HTMLInputElement>(null)
  const imageInput = useRef<HTMLInputElement>(null)

  const { setUser, user } = useContext(AuthContext)
  const authCondition = (user?.role === 'admin')
  const router = useRouter()


  const handleRegisterProduct = async () => {
    const newProduct = {
      title: titleInput.current?.value,
      price: priceInput.current?.value,
      description: descriptionInput.current?.value,
      image: imageInput.current?.value
    }
    try {
      const headers = {
        'Authorization': `Bearer ${localToken}`
    }
      const register = await axios.post('http://localhost:4000/beers/', newProduct, {headers: headers})
      alert('Produto cadastrado com sucesso!')
      console.log('new product: ', newProduct)
    } catch (erro) {
      alert(`${erro} - Não foi possível cadastrar produto`)
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId = decodeToken(localToken).sub
      axios.get(`http://localhost:4000/users/${userId}`).then(
        (response: any) => setUser(response.data)
      )
    } else  if (!localToken && !user) {
      router.push('/login')
    }
  }, [user])

  return (
    <div>
      <input type='text' ref={titleInput} placeholder='Digite o nome do produto aqui...' required></input>
      <input type='text' ref={priceInput} placeholder='Digite o preço do produto aqui...' required></input>
      <input type='text' ref={descriptionInput} placeholder='Digite a descrição do produto aqui...' required></input>
      <input type='text' ref={imageInput} placeholder='Coloque a URL da imagem do produto aqui...' required></input>
      <button onClick={handleRegisterProduct}>Cadastrar Produto</button>
      <Link href='/products'>
        <a>Voltar para página de Produtos</a>
      </Link>
      <Link href='/home'>
      <a>Voltar para Home</a>
      </Link>
    </div>
  )
}

export default RegisterProduct