import { useEffect, useState } from "react"

function useDebounce(value, delay=500) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value)
        }, delay)
  
        return () => {
          clearTimeout(handler)
        }
      },[value, delay] // Only re-call effect if value or delay changes
    )
    return debouncedValue;
  }