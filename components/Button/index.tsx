import React from 'react'

import * as S from './styles'

export interface ButtonProps {
  backgroundColor: string,
  children?: React.ReactNode,
  onClick?: (e?: React.MouseEvent) => void,
}

const Button = (props: ButtonProps) => {
  const { backgroundColor, children, onClick } = props

  return (
    <S.Button
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
    </S.Button>
  )
}

export default Button