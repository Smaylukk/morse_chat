import { useEffect } from 'react'

export const useBeforeUnload = (value) => {
  const handleUnload = (e) => {
    let returnValue
    if (typeof value === 'function') {
      returnValue = value(e)
    } else {
      returnValue = value
    }
    if (returnValue) {
      e.preventDefault()
      e.returnValue = returnValue
    }
    return returnValue
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
    // eslint-disable-next-line
  }, [])
}