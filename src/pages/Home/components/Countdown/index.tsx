import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountDownContainer, Separator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markActiveCycleAsFinished,
    secondsAmountPassed,
    setSecondsPassed
  } = useContext(CyclesContext)

  const cycleTotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceInSecondsFromNow = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )
        if (differenceInSecondsFromNow > cycleTotalSeconds) {
          markActiveCycleAsFinished()
          setSecondsPassed(cycleTotalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(differenceInSecondsFromNow)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    cycleTotalSeconds,
    markActiveCycleAsFinished,
    setSecondsPassed
  ])

  const currentTimerTotalSeconds = activeCycle
    ? cycleTotalSeconds - secondsAmountPassed
    : 0

  const currentTimerMinutesAmount = Math.floor(currentTimerTotalSeconds / 60)
  const currentTimerMinutesAmoumtInStringFormat = String(
    currentTimerMinutesAmount
  ).padStart(2, '0')

  const currentTimerSecondsAmount = currentTimerTotalSeconds % 60
  const currentTimerSecondsAmoumtInStringFormat = String(
    currentTimerSecondsAmount
  ).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${currentTimerMinutesAmoumtInStringFormat}:${currentTimerSecondsAmoumtInStringFormat}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [
    currentTimerMinutesAmoumtInStringFormat,
    currentTimerSecondsAmoumtInStringFormat,
    activeCycle
  ])

  return (
    <CountDownContainer>
      <span>{currentTimerMinutesAmoumtInStringFormat[0]}</span>
      <span>{currentTimerMinutesAmoumtInStringFormat[1]}</span>
      <Separator>:</Separator>
      <span>{currentTimerSecondsAmoumtInStringFormat[0]}</span>
      <span>{currentTimerSecondsAmoumtInStringFormat[1]}</span>
    </CountDownContainer>
  )
}
