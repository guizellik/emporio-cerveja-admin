import styled from 'styled-components'

export const RegisterProductWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 16px;
`

export const Title = styled.h1`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
`

export const RegisterProductInput = styled.input`
  width: 100%;
  display: flex;
  justify-content: center;
  border: none;
	border-bottom: 1px solid #ddd;
  width: 14rem;
  font-size: 13px;
  margin: 8px;
  &:last-of-type {
    margin-bottom: 20px;
  }

`
