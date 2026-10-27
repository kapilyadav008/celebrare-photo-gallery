import { memo } from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="mb-8">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author
      </label>
      <input
        id="author-search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by author name"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:max-w-md"
      />
    </div>
  )
}

export default memo(SearchBar)
