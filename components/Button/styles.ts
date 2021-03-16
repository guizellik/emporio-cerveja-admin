import styled from 'styled-components'

import { ButtonProps } from './index'

export const Button = styled.button`
  align-items: center;
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  height: 40px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  position: relative;
  &:hover {
    color: #fff;
  }
`