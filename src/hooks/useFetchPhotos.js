import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

// Custom hook: fetches the photos once and reports the state of the request.
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Lets us cancel the request if the component unmounts mid-fetch.
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        // fetch() only rejects on network failure, so check HTTP status ourselves.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()

        // Guard against an invalid response shape.
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response from the server')
        }

        setPhotos(data)
      } catch (err) {
        // An abort is expected on unmount, not a real error.
        if (err.name === 'AbortError') return
        setError('Could not load photos. Please check your connection and try again.')
      } finally {
        // Don't touch state if the component has already gone away.
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPhotos()

    // Cleanup: runs when the component unmounts.
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
