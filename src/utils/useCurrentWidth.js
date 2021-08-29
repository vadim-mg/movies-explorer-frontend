import { useState, useEffect } from "react"

function useCurrentWidth() {
  const getWidth = () => window.innerWidth

  let [width, setWidth] = useState(getWidth())

  useEffect(() => {
    let timeout = null;
    const onResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setWidth(getWidth())
      }, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return width
}

export default useCurrentWidth
