import React from 'react'
import * as S from './styles'

export interface CardProps {
  children?: React.ReactNode,
  title: string,
}

const Card = (props) => {
  const { children, title } = props
  return (
      <S.Card>
        <S.CardContentWrapper>
          <S.Title>{title}</S.Title>
          <S.Amount>{children}</S.Amount>
        </S.CardContentWrapper>
      </S.Card>
  )
}

export default Card