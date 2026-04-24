import { useEffect, useState } from 'react'
import Main from '../Main'
import api from '../services/api'
import perfil from '../assets/images/perfil.jpg'
import Botao from '../components/Botao'

export interface UserResult {
  id: number
  username: string
  full_name: string
  profession: string
  bio: string
  avatar: string
}

const baseImageUrl = 'http://localhost:8000'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UserResult[]>([])
  const [loading, setLoading] = useState(false)
  const [following, setFollowing] = useState<UserResult[]>([])
  const [follower, setFollower] = useState<UserResult[]>([])

  const getAvatar = (avatar?: string) => {
    if (!avatar) return perfil
    if (avatar.startsWith('http')) return avatar
    return `${baseImageUrl}${avatar}`
  }

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/search/?q=${query}`)
        setResults(res.data)
      } catch (err) {
        console.error('Erro na busca', err)
      } finally {
        setLoading(false)
      }
    }
    const delay = setTimeout(fetchResults, 400)
    return () => clearTimeout(delay)
  }, [query])

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await api.get('/following/')
        setFollowing(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchFollowing()
  }, [])

  useEffect(() => {
    const fetchFollower = async () => {
      try {
        const res = await api.get('/followers/')
        setFollower(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchFollower()
  }, [])

  const toggleFollow = async (user: UserResult) => {
    console.log('ID enviado para follow:', user.id)
    try {
      await api.post(`/follow/${user.id}/`)

      const isFollowing = following.some((u) => u.id === user.id)

      if (isFollowing) {
        setFollowing((prev) => prev.filter((u) => u.id !== user.id))
      } else {
        setFollowing((prev) => [...prev, user])
        setQuery('')
        setResults([])
      }
    } catch (err) {
      console.error('Erro ao seguir usuário', err)
    }
  }

  return (
    <Main className="flex w-full items-center justify-center bg-gray-900 text-white">
      <div className="flex w-full max-w-3xl flex-col justify-center gap-4">
        <h2 className="mb-12 mt-20 text-center text-5xl">Pesquisar #</h2>
        <div className="mb-6 rounded-lg border border-yellow-300/40 bg-yellow-200/90 p-4 text-gray-900 shadow-lg">
          <p className="mt-1 text-sm">
            Para testar a pesquisa, digite &quot;Space&quot; que aparecerá alguns Usuários.
          </p>
        </div>

        <div className="flex h-16 w-full items-center rounded-md bg-white/5 px-4 outline outline-1 outline-white/10 focus-within:outline-indigo-500">
          <input
            type="text"
            placeholder="Pesquisar por Usuários"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-lg text-white placeholder-white outline-none"
          />
        </div>
        {loading && <p className="text-center text-gray-400">Buscando...</p>}

        <div className="flex flex-col gap-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-white/10 p-4 hover:bg-white/5"
            >
              <div className="flex gap-4">
                <img src={getAvatar(user.avatar)} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-indigo-400">@{user.username}</p>
                  <p className="text-sm text-gray-300">{user.profession || 'Sem profissão'}</p>
                  <p className="text-xs text-gray-500">{user.full_name}</p>
                </div>
              </div>
              <div className="flex">
                <Botao
                  onClick={() => toggleFollow(user)}
                  className="w-30 relative z-50 flex h-12 items-center justify-center rounded-md bg-white/5 p-4 text-white ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10 hover:ring-2 hover:ring-indigo-500 active:scale-[0.96] active:ring-2 active:ring-indigo-500"
                >
                  {following.some((u) => u.id === user.id) ? 'Deixar de seguir' : 'Seguir'}
                </Botao>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div className="mt-10">
            <h3 className="mb-4 text-center text-xl font-semibold text-indigo-400">Seguindo</h3>

            {following.length === 0 && <p className="text-sm text-gray-500">Ninguém ainda</p>}
            <div className="flex flex-col gap-3">
              {following.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-md bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <img src={getAvatar(user.avatar)} className="h-10 w-10 rounded-full object-cover" />
                    <span>@{user.username}</span>
                  </div>

                  <button onClick={() => toggleFollow(user)} className="text-sm text-red-400 hover:text-red-300">
                    Deixar de seguir
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="mb-4 text-center text-xl font-semibold text-indigo-400">Seguidores</h3>
            {follower.length === 0 && <p className="text-sm text-gray-500">Nenhum seguidor ainda</p>}
            <div className="flex flex-col gap-3">
              {follower.map((user) => (
                <div key={user.id} className="flex items-center justify-between rounded-md bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <img src={getAvatar(user.avatar)} className="h-10 w-10 rounded-full object-cover" />
                    <span>@{user.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default Search
