import { useState } from 'react'

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Local UI state for one card: did its image fail to load?
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] bg-slate-100">
        {imageFailed ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Image unavailable
          </div>
        ) : (
          <img
            src={photo.download_url}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate text-sm font-medium text-slate-800">{photo.author}</p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          className={`shrink-0 rounded-full p-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-slate-500 ${
            isFavourite ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default PhotoCard
