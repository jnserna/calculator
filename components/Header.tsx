import { ArrowLeft } from 'lucide-react'
import OverflowMenu from './OverflowMenu'

interface HeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  showMenu?: boolean
}

export default function Header({ title, showBack = false, onBack, showMenu = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-[#8B7FEE] shadow-md">
      {showBack ? (
        <button
          onClick={onBack}
          aria-label="Volver"
          className="p-2 rounded-full text-white hover:bg-white/20 active:bg-white/30 transition-colors -ml-2"
        >
          <ArrowLeft size={22} />
        </button>
      ) : (
        <div className="w-10" />
      )}

      <h1 className="flex-1 text-center text-lg font-bold text-white tracking-wide">
        {title}
      </h1>

      {showMenu ? (
        <OverflowMenu />
      ) : (
        <div className="w-10" />
      )}
    </header>
  )
}
