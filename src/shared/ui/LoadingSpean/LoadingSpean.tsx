import React from 'react'
import styled from '@emotion/styled';

interface IProp {
  color: string
}

const LoadingSpean = ({ color }: IProp) => {
  return (
    <Spean bgcolor={color}></Spean>
  )
}

const Spean = styled.div<{ bgcolor: string }>`
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid ${p => p.bgcolor}; /* Blue */
  border-radius: 50%;
  width: 20.5px;
  height: 20.5px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`


export default LoadingSpean