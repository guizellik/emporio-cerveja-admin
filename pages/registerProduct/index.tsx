import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { decodeToken } from 'react-jwt'
import { toast } from 'react-toastify';

import { AuthContext } from '../../context'
import Layout from '../../components/Layout'

const RegisterProduct = () => {
  let localToken
  const titleInput = useRef<HTMLInputElement>(null)
  const priceInput = useRef<HTMLInputElement>(null)
  const descriptionInput = useRef<HTMLInputElement>(null)
  const imageInput = useRef<HTMLInputElement>(null)

  const { setUser, user } = useContext(AuthContext)
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
      await axios.post('http://localhost:4000/beers/', newProduct, {headers: headers})
      toast('Produto cadastrado com sucesso!')
    } catch (err) {
      alert(`Houve um erro ao cadastrar um produto: ${err}`)
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
    <Layout>
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
    </Layout>
  )
}

export default RegisterProduct