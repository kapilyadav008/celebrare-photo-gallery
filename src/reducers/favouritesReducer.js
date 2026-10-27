export const FAVOURITES_STORAGE_KEY = 'photo-gallery-favourites'

// Used as the reducer's lazy initializer: reads saved favourites (array of photo ids).
// Any missing or invalid data safely falls back to an empty list.
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((id) => typeof id === 'string' || typeof id === 'number')
  } catch {
    return []
  }
}

// state = array of favourited photo ids
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id) // already a favourite -> remove
        : [...state, action.id] // not a favourite -> add
    default:
      return state
  }
}
