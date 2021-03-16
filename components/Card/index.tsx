import React from 'react'
import * as S from './styles'

export interface CardProps {
  children?: React.ReactNode,
  title: string,
}

const Card = (props: CardProps) => {
  const { children, title } = props
  return (
      <S.Card>
        <S.CardContentWrapper>
          <S.Title>{title}</S.Title>
          {children}
        </S.CardContentWrapper>
      </S.Card>
  )
}

export default Card