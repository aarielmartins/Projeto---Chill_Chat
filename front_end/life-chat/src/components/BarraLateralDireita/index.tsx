import logo from '../../assets/images/logoChat.png'
import { Hash, CirclePlus as Plus } from 'lucide-react'
import Botao from '../Botao'

type Props = {
  onAbrirPost: () => void
}

const BarraLateralDireita = ({ onAbrirPost }: Props) => {
  return (
    <aside className="h-screen p-4">
      <div className="padding mb-12 flex items-center justify-center">
        <img className="logo w-100 mt-6" src={logo} alt="Logo" />
      </div>
      <div className="flex items-center pl-2">
        <h2 className="mt-10 text-center text-3xl">
          <Hash className="mr-2 inline" />
          Temas em alta hoje!
        </h2>
      </div>
      <div className="gap-y flex flex-col gap-6">
        <div className="mt-8 space-y-1 pl-6">
          <p>
            <a className="text-blue-300 hover:underline" href="#">
              Amizade #
            </a>
          </p>
          <p>Sempre quis fazer uma viagem sozinha...</p>
        </div>
        <div className="mt-8 space-y-1 pl-6">
          <p>
            <a className="text-blue-300 hover:underline" href="#">
              Viajando Sozinha #
            </a>
          </p>
          <p>Sempre quis fazer uma viagem sozinha e agora estou pronta...</p>
        </div>
        <div className="mt-8 space-y-1 pl-6">
          <p>
            <a className="text-blue-300 hover:underline" href="#">
              IA para todos #
            </a>
          </p>
          <p>O que sabemos do poder de uma IA nas nossas vidas...</p>
        </div>
      </div>
      <div className="group relative mt-20 flex items-center justify-center">
        <Botao
          onClick={() => {
            onAbrirPost()
          }}
          className="text-md [&:hover]:text-blue-300"
          aria-label="Configuração"
        >
          <Plus size={70} />
        </Botao>
        <span className="text-md pointer-events-none absolute left-1/2 top-1/2 -translate-y-2 translate-x-6 rounded bg-gray-800/90 px-3 py-1 text-white opacity-0 transition group-hover:opacity-100">
          Criar
        </span>
      </div>
    </aside>
  )
}

export default BarraLateralDireita
