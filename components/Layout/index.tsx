import React from 'react'

import SideMenu from '../SideMenu'

import * as S from './styles'

const Layout = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <SideMenu />
      <S.ContentWrapper>
        {children}
      </S.ContentWrapper>
    </S.LayoutWrapper>
  )
}

export default Layout