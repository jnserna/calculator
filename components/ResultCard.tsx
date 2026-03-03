interface Row {
  label: string
  value: string
  highlight?: boolean
}

interface ResultCardProps {
  title: string
  rows: Row[]
  accentColor?: string
}

export default function ResultCard({ title, rows, accentColor = 'border-primary' }: ResultCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-card border-l-4 ${accentColor} p-5`}>
      <h2 className="text-base font-bold text-dark mb-4">{title}</h2>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{row.label}</span>
            <span
              className={`text-sm font-semibold ${row.highlight ? 'text-primary text-base' : 'text-dark'}`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
