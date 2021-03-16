import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Logo from '../../assets/logo.png'
import { AuthContext } from '../../context'

import * as S from './styles'
import Button from '../Button'

const SideMenu = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const handleLogout = () => {
    toast('Usuário deslogado com sucesso')
    localStorage.clear();
    router.push('/login')
  }

  return (
    <S.MenuWrapper>
      <S.NavBar>
        <S.MenuList>
          <S.MenuItem>
            <Link href='/home'>
              <S.Logo src={Logo} alt='product logo' />
            </Link>
          </S.MenuItem>
          {user?.role === 'admin' ?
            <>
              <S.MenuItem>
                <S.MenuCategory>
                  Usuários
                </S.MenuCategory>
              </S.MenuItem>
              <S.SubMenuItem>
                <Link href='/users'>
                  <S.MenuLink><ChevronRightIcon/> Lista</S.MenuLink>
                </Link>
              </S.SubMenuItem>
              <S.SubMenuItem>
                <Link href='/registerUser'>
                  <S.MenuLink><ChevronRightIcon/> Cadastro</S.MenuLink>
                </Link>
              </S.SubMenuItem>
            </>
          : ''}
          <S.MenuItem>
            <S.MenuCategory>Produtos</S.MenuCategory>
          </S.MenuItem>
          <S.SubMenuItem>
            <Link href='/products'>
              <S.MenuLink><ChevronRightIcon/> Lista</S.MenuLink>
            </Link>
          </S.SubMenuItem>
          <S.SubMenuItem>
            <Link href='/registerProduct'>
              <S.MenuLink><ChevronRightIcon/> Cadastro</S.MenuLink>
            </Link>
          </S.SubMenuItem>
        </S.MenuList>
      </S.NavBar>
      <Button backgroundColor='#F8A849' onClick={handleLogout}>
        Sair
      </Button>
    </S.MenuWrapper>
  )
}

export default SideMenu