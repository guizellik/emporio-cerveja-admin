import styled from 'styled-components'

export const UserWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  width: 100%;
`

export const UserList = styled.ul`
  border-radius: 4px;
  list-style-type: none;
  padding-inline-start: 0px;
  width: 100%;
`

export const UserListItem = styled.li`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-bottom: 10px;
  text-align: left;
  width: 800px;
  &:nth-child(2){
    background-color: rgba(248, 168, 73, 0.6);
  }
`
