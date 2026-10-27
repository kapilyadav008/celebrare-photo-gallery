import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  FAVOURITES_STORAGE_KEY,
} from '../reducers/favouritesReducer'
import SearchBar from './SearchBar'
import PhotoCard from './PhotoCard'

function Gallery() {
  // Data comes from the custom hook; Gallery never calls fetch itself.
  const { photos, loading, error } = useFetchPhotos()

  // useState is fine for the search text (not the favourites list).
  const [query, setQuery] = useState('')

  // Favourites: useReducer. The 3rd argument runs once to load saved data.
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  // Save to localStorage whenever favourites change.
  // This effect only writes to storage and never sets state, so it cannot loop.
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // Storage can be full or blocked; the app still works without saving.
    }
  }, [favourites])

  // Search input handler: same function reference between renders.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // Filtered list: only recomputed when photos or query change.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  const handleToggleFavourite = (id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }

  return (
    <section>
      <SearchBar value={query} onChange={handleSearchChange} />

      {loading && (
        <div role="status" className="flex flex-col items-center gap-3 py-24 text-slate-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
          <p>Loading photos…</p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center"
        >
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          {query ? `No photos match "${query}".` : 'No photos to show.'}
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <li key={photo.id}>
              <PhotoCard
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Gallery
