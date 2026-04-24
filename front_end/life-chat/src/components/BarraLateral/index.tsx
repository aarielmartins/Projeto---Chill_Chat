import {
  House,
  UserRoundPen as Account,
  FishingHook as Reels,
  Search,
  MailCheck as Message,
  Cog as More
} from 'lucide-react'
import perfil from '../../assets/images/perfil.jpg'
import Botao from '../Botao'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../services/api'

interface IProfileHeader {
  avatar: string | null
  username: string
}

type Props = {
  onAbrirConfig: () => void
}

const BarraLateral = ({ onAbrirConfig }: Props) => {
  const [profile, setProfile] = useState<IProfileHeader | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile/')
        setProfile(response.data)
      } catch (error) {
        console.error('Erro ao buscar perfil:', error)
      }
    }
    fetchProfile()
  }, [])

  const formatName = (name: string) => {
    return name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (!profile) return <p>Carregando...</p>

  return (
    <aside className="h-screen p-4">
      <div className="padding mb-24 flex items-center gap-6">
        <img
          className="avatar w-30 h-30 mt-12 rounded-full object-cover"
          src={profile?.avatar || perfil}
          alt="Perfil"
        />
        <h3 className="mt-12 text-2xl text-blue-300">{`@${formatName(profile?.username || 'Usuário')}`}</h3>
      </div>
      <div className="gap-y mt-10 flex flex-col gap-2">
        <NavLink
          to="/perfil/pagina-inicial"
          className={({ isActive }) =>
            `flex items-center justify-center gap-4 text-3xl transition ${isActive ? 'text-blue-300' : 'text-white [&:hover]:text-blue-300'}`
          }
        >
          <House className="icon text-blue-300" />
          <span>Página Inicial</span>
        </NavLink>
        <NavLink
          to="/perfil/profile"
          className={({ isActive }) =>
            `mt-10 flex items-center justify-center gap-4 text-3xl transition ${isActive ? 'text-blue-300' : 'text-white [&:hover]:text-blue-300'}`
          }
        >
          <Account className="icon text-blue-300" />
          <span>Perfil</span>
        </NavLink>
        <NavLink
          to="/perfil/search"
          className={({ isActive }) =>
            `mt-10 flex items-center justify-center gap-4 text-3xl transition ${isActive ? 'text-blue-300' : 'text-white [&:hover]:text-blue-300'}`
          }
        >
          <Reels className="icon text-blue-300" />
          <span>Pesquisar</span>
        </NavLink>
        <NavLink
          to="/perfil/reels"
          className={({ isActive }) =>
            `mt-10 flex items-center justify-center gap-4 text-3xl transition ${isActive ? 'text-blue-300' : 'text-white [&:hover]:text-blue-300'}`
          }
        >
          <Search className="icon text-blue-300" />
          <span>Reels Global</span>
        </NavLink>
        <NavLink
          to="/perfil/messages"
          className={({ isActive }) =>
            `mt-10 flex items-center justify-center gap-4 text-3xl transition ${isActive ? 'text-blue-300' : 'text-white [&:hover]:text-blue-300'}`
          }
        >
          <Message className="icon text-blue-300" />
          <span>Mensagens</span>
        </NavLink>
        <div className="padding2 group relative mt-32 flex items-center justify-center">
          <Botao
            onClick={() => {
              onAbrirConfig()
            }}
            className="text-md [&:hover]:text-blue-300"
            aria-label="Configuração"
          >
            <More size={70} />
          </Botao>
          <span className="text-md pointer-events-none absolute left-1/2 top-1/2 -translate-y-2 translate-x-4 rounded bg-gray-800/90 px-3 py-1 text-white opacity-0 transition group-hover:opacity-100">
            Configurar Perfil
          </span>
        </div>
      </div>
    </aside>
  )
}

export default BarraLateral
