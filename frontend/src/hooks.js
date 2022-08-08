import { useRef } from 'react'

export const useClickPreventionOnDoubleClick = ({ onClick, onDoubleClick, delay = 200 }) => {
  let prevent = false
  const timer = useRef(null)

  const handleClick = () => {
    timer.current = setTimeout(() => {
      if (!prevent) {
        onClick()
      }

      prevent = false
    }, delay)
  }

  const handleDoubleClick = () => {
    clearTimeout(timer.current)
    prevent = true
    onDoubleClick()
  }

  return [handleClick, handleDoubleClick]
}
