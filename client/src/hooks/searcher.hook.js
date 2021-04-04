import { useState, useCallback, useRef, useEffect } from 'react'
import { searchAndFilter } from '../utils/functions'

export const useSearcher = data => {
  const dataReference = useRef(null)
  const [input, setInput] = useState('')
  const [array, setArray] = useState([])

  const search = useCallback(() => {
    setArray(searchAndFilter(dataReference.current, input.trim()))
  }, [input, setArray])

  useEffect(() => {
    dataReference.current = data
    setArray(data)
  }, [data])

  return { search, array, input, setInput }
}
