import { useRef, useEffect } from 'react'

export const useHeight = (trigger, options = {}) => {
  const ref = useRef()
  const height = useRef()

  const hide = (init = true) => {
    if (!ref.current) return

    if (init) {
      ref.current.style.height = '0px'
      return (ref.current.style.display = 'none')
    }

    ref.current.style.height = height.current + 'px'

    setTimeout(() => {
      ref.current.style.height = '0px'
      ref.current.style.margin = '0'
    }, 100)
  }

  const show = () => {
    if (ref.current.style.display === 'none') {
      if (!options.isNotFlex) {
        ref.current.style.display = 'flex'
      } else ref.current.style.display = null

      ref.current.style.margin = null

      setTimeout(() => {
        if (ref.current) ref.current.style.height = height.current + 'px'
      }, 50)

      return setTimeout(() => {
        if (ref.current) ref.current.style.height = null
      }, 300)
    }

    ref.current.style.margin = null

    setTimeout(() => {
      if (ref.current) ref.current.style.height = height.current + 'px'
    }, 200)

    setTimeout(() => {
      if (ref.current) ref.current.style.height = null
    }, 500)
  }

  useEffect(() => {
    if (ref.current) {
      height.current = ref.current.getBoundingClientRect().height
      !trigger && hide()
    }
  }, [ref])

  useEffect(() => {
    ref.current && trigger ? show() : hide(false)
  }, [trigger, show])

  return { ref }
}
