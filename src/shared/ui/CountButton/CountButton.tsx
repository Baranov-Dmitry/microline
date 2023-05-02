import React from 'react'
import { Button, SxProps, Theme } from '@mui/material'
import LoadingSpean from '../LoadingSpean/LoadingSpean';

interface IProp {
  variant: "text" | "contained" | "outlined";
  text: string;
  handleClick: () => void,
  isDisabled: boolean
}

const btnStyle: SxProps<Theme> = {
  width: "100%",
  color: '#201906',
  backgroundColor: '#fbc02d',
  "&:hover": {
    backgroundColor: '#facc59',
  },
}

const CountButton: React.FC<IProp> = ({ variant, text, handleClick, isDisabled }) => {

  return (
    <Button disabled={isDisabled} onClick={handleClick} sx={btnStyle} variant={variant}>
      {isDisabled === false
        ? text
        : <LoadingSpean color='' />
      }

    </Button>
  )
}

export default CountButton