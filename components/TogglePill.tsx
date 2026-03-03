interface Option<T extends string> {
  label: string
  value: T
}

interface TogglePillProps<T extends string> {
  options: Option<T>[]
  selected: T
  onChange: (value: T) => void
  name: string
}

export default function TogglePill<T extends string>({
  options,
  selected,
  onChange,
  name,
}: TogglePillProps<T>) {
  return (
    <div role="radiogroup" aria-label={name} className="flex gap-2">
      {options.map((opt) => {
        const isActive = opt.value === selected
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
              isActive
                ? 'bg-primary border-primary text-white shadow-md'
                : 'bg-white border-primary/40 text-primary hover:border-primary'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
