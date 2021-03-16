import styled from 'styled-components'

export const ProductDetails = styled.p`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-bottom: 10px;
  text-align: left;
  width: 800px;
  &:nth-child(2n){
    background-color: rgba(248, 168, 73, 0.6);
  }
`

export const ProductWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  width: 100%;
`

export const ProductList = styled.ul`
  border-radius: 4px;
  list-style-type: none;
  margin-left: 4px;
  padding: 8px;
  width: 100%;
`

export const ProductListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  &:nth-child(2){
    background-color: rgba(248, 168, 73, 0.6);
  }
`

export const Title = styled.h1`
`