import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { decodeToken } from 'react-jwt'
import { toast } from 'react-toastify'
import { NextPage } from 'next'

import { AuthContext } from '../../context'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import { ProductPayload } from '../../types/products'


import * as S from './styles'

const RegisterProduct: NextPage = () => {
  let localToken: string
  const titleInput = useRef<HTMLInputElement>(null)
  const priceInput = useRef<HTMLInputElement>(null)
  const descriptionInput = useRef<HTMLInputElement>(null)
  const imageInput = useRef<HTMLInputElement>(null)

  const { setUser, user } = useContext(AuthContext)
  const router = useRouter()

  const handleRegisterProduct = async () => {
    const formProductValidation = titleInput.current?.value &&
      priceInput.current?.value &&
      descriptionInput.current?.value &&
      imageInput.current?.value

    if (formProductValidation) {
      const newProduct: ProductPayload = {
        title: titleInput.current?.value,
        price: priceInput.current?.value,
        description: descriptionInput.current?.value,
        image: imageInput.current?.value
      }
      try {
        const headers = {'Authorization': `Bearer ${localToken}`}
        await axios.post('http://localhost:4000/beers/', newProduct, {headers: headers})
        toast.success('Produto cadastrado com sucesso!')
      } catch (erro) {
        toast.error('Houve um erro ao cadastrar um produto')
        console.log(erro)
      }
    } else {
      toast.error('Preencha todos os campos')
    }
  }

  useEffect(() => {
    localToken = localStorage.getItem('token')
    if (localToken && !user) {
      const userId: number = decodeToken(localToken).sub
      axios.get(`http://localhost:4000/users/${userId}`).then(
        (response: any) => setUser(response.data)
      )
    } else  if (!localToken && !user) {
      router.push('/login')
    }
  }, [user])

  return (
    <Layout>
      <S.RegisterProductWrapper>
        <S.Title>Cadastro de Produtos</S.Title>
        <S.RegisterProductInput type='text' ref={titleInput} placeholder='Nome do produto' />
        <S.RegisterProductInput type='text' ref={priceInput} placeholder='Preço do produto' />
        <S.RegisterProductInput type='text' ref={descriptionInput} placeholder='Descrição do produto' />
        <S.RegisterProductInput type='text' ref={imageInput} placeholder='URL da imagem do produto' />
        <Button
          backgroundColor='#F8A849'
          onClick={handleRegisterProduct}
        >
          Cadastrar Produto
        </Button>
      </S.RegisterProductWrapper>
    </Layout>
  )
}

export default RegisterProduct