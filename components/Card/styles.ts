import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  text-align: center;
  background-color: white;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
  margin: 0 10px;
  height: auto;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 4px;
  transition: ease-out 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
  }
`
export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const Title = styled.p`
  font-weight: bold;
`
