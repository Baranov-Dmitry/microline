import React, { useContext, useRef } from 'react';
import styled from '@emotion/styled';
import CountButton from './shared/ui/CountButton/CountButton';
import { CountContext, ActionTypes, IsLoading } from './store/СountReduser';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CountRectangle from './shared/ui/CountRectangle/CountRectangle';

const IconOutlineIcon = <ErrorOutlineIcon sx={{ color: '#1993d6', paddingRight: "20px" }} />
const IconProblemOutlined = <ReportProblemOutlinedIcon sx={{ color: '#fccb50', paddingRight: "20px" }} />

function App() {

  const { state, dispatch } = useContext(CountContext)
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const isButtonDisabled = state.isLoading !== IsLoading.Idle

  const handleClick = () => {
    dispatch({ type: ActionTypes.IncreaseCount, payload: 1 })

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      dispatch({ type: ActionTypes.CountFromServer })
    }, 1000)

  }

  return (
    <CountContainer>

      <CountButton
        isDisabled={isButtonDisabled}
        handleClick={handleClick}
        variant="contained"
        text='КЛИКНУТЬ' />

      <CountRectangle
        bgcolor="#e5f6fd"
        icon={IconOutlineIcon}
        text={`Кликнули ${state.count} раз`}
      />

      <CountRectangle
        bgcolor="#fefbea"
        icon={IconProblemOutlined}
        text={`По версии сервера: ${state.serverCount} раз`}
      />

      {state.error &&
        <CountRectangle bgcolor="#fb5a5a" text={state.error} />
      }

      {/* Вторая кнопка тут не к чему */}
      <CountButton
        isDisabled={isButtonDisabled}
        handleClick={handleClick}
        variant="contained"
        text='КЛИКНУТЬ' />

    </CountContainer>
  );
}

const CountContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

export default App;
