import Main from '../Main'
import { Frown } from 'lucide-react'

const Reels = () => {
  return (
    <Main className="flex w-full items-center justify-center bg-gray-900 text-white">
      <div>
        <h2 className="mb-12 mt-20 text-center text-5xl">Reels Global #</h2>
        <p className="mt-60 text-center text-lg">Não temos conteúdo para mostrar ainda.</p>
        <Frown size={42} className="mx-auto mt-10" />
      </div>
    </Main>
  )
}

export default Reels
