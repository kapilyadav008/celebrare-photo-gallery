# Photo Gallery

A small React app that loads 30 photos from the Picsum API, shows them in a responsive grid, lets you search by author, and lets you mark favourites that survive a page refresh.

## Features

- Fetches 30 photos on load, with a loading spinner and an error message with a Retry button
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Each card shows the photo, the author name, and a heart button
- Real-time, case-insensitive search by author (filters already-fetched data, no extra API calls)
- Favourites managed with `useReducer` and saved in `localStorage`

## Technologies

React (functional components + hooks), Vite, Tailwind CSS v4. No component libraries.

## Installation and run

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run preview   # preview the production build
```

## Main files

```
src/
  components/
    Gallery.jsx     # uses the hook, search (useCallback/useMemo), favourites (useReducer)
    PhotoCard.jsx   # one photo: image, author, heart button
    SearchBar.jsx   # search input
  hooks/
    useFetchPhotos.js        # custom hook returning { photos, loading, error }
  reducers/
    favouritesReducer.js     # reducer + localStorage loader
  App.jsx
  main.jsx
  index.css
```

## API

`GET https://picsum.photos/v2/list?limit=30` (uses `id`, `author`, `download_url`)

## How favourites persistence works

- The favourites list is an array of photo ids managed by `useReducer` with one action, `TOGGLE_FAVOURITE`.
- On first load, the reducer's initial state is read from `localStorage` (key `photo-gallery-favourites`) through the `loadFavourites` function. Missing or invalid data falls back to an empty list.
- A `useEffect` in `Gallery.jsx` watches the favourites array and writes it back to `localStorage` whenever it changes. The effect only writes to storage and never updates state, so it cannot cause a render loop.
