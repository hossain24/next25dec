const states = [
  { id: 1, name: '', value: '' },
  { id: 2, name: '', value: '' },
  { id: 3, name: '', value: '' },
]

export default function About() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {states.map((state) => (
            <div key={state.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-400">{state.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-slate-500 sm:text-5xl">{state.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
