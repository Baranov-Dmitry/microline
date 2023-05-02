import styled from '@emotion/styled'
import React from 'react'

const CountRectangle = ({ text, bgcolor, icon }: { text: string, bgcolor: string, icon?: string | JSX.Element | JSX.Element[], }) => {
  console.log("CountRectangle")
  return (
    <Rectangle bgcolor={bgcolor} >
      {icon}
      {text}
    </Rectangle>
  )
}

const Rectangle = styled.div<{ bgcolor: string }>`
  width: 100%;
  background-color: ${p => p.bgcolor};
  padding: 0 20px;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-top: 14px;
  border-radius: 4px;
`

export default React.memo(CountRectangle)