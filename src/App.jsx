import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-semibold tracking-tight">Photo Gallery</h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse photos, search by author, and save your favourites.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Gallery />
      </main>
    </div>
  )
}

export default App
