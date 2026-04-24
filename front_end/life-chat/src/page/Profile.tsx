import { useEffect, useState } from 'react'
import Main from '../Main'
import api from '../services/api'
import perfil from '../assets/images/perfil.jpg'
import fundo from '../assets/images/imagem-fundo.png'

interface IProfile {
  username: string
  full_name: string
  avatar: string | null
  cover_photo: string | null
  birth_date: string | null
  phone: string
  profession: string
  website: string
  bio: string
  following_count: number
  followers_count: number
}

const Profile = () => {
  const [profile, setProfile] = useState<IProfile | null>(null)

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

  const formatDate = (date: string | null | undefined) => {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  const formatPhone = (phone?: string) => {
    if (!phone) return ''

    const digits = phone.replace(/\D/g, '')

    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }

    if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }

    return phone
  }

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <Main className="relative block bg-gray-900 p-6 text-white">
      <div className="">
        <img
          className="profile h-[400px] w-full object-cover"
          src={profile.cover_photo || fundo}
          alt="Imagem de fundo"
        />
        <img
          className="profileAvatar top-70 absolute left-1/2 h-60 w-60 translate-x-1/2 rounded-full border-4 border-white bg-gray-200 object-cover"
          src={profile.avatar || perfil}
          alt="Imagem de perfil"
        />
      </div>
      <div>
        <h3 className="ml-8 p-8 text-4xl font-semibold text-blue-300">{`@${formatName(profile.username)}`}</h3>
      </div>
      <div className="profileM mx-20 mr-32 mt-16 flex justify-between text-xl">
        <div className="space-y-4">
          <p>
            <strong className="text-blue-300">Nome Completo:</strong> {formatName(profile.full_name)}
          </p>
          <p>
            <strong className="text-blue-300">Data de Nascimento:</strong> {formatDate(profile.birth_date)}
          </p>
          <p>
            <strong className="text-blue-300">Cel:</strong> {formatPhone(profile.phone)}
          </p>
          <p>
            <strong className="text-blue-300">Profissão:</strong> {formatName(profile.profession)}
          </p>
          <p>
            <strong className="text-blue-300">Sobre Você:</strong> {formatName(profile.bio)}
          </p>
        </div>
        <div className="space-y-4">
          <p>
            <strong className="text-blue-300">Seguindo:</strong> {profile.following_count}
          </p>
          <p>
            <strong className="text-blue-300">Seguidores:</strong> {profile.followers_count}
          </p>
        </div>
      </div>
    </Main>
  )
}

export default Profile
