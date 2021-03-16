import styled from 'styled-components'

export const MenuWrapper = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;
`

export const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
`
export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: auto;
  cursor: pointer;
`

export const MenuItem = styled.li`
  color: black;
  margin-top: 4px;
  text-align: left;
  width: 100%;
`

export const SubMenuItem = styled.li`
  color: black;
  font-size: 12px;
  text-align: left;
  width: 100%;
`

export const MenuCategory = styled.span`
  margin-left: 16px;
  width: 100%;
`

export const MenuLink = styled.a`
  align-items: center;
  color: #000;
  display: flex;
  padding: 4px 16px;
  text-decoration: none;
  /* &.active {
    background-color: #4CAF50;
    color: white;
  } */
  &:hover {
    background-color: #555;
    color: white;
  }
`

export const Logo = styled.img`
  margin: 16px;
  width: 150px;
`
