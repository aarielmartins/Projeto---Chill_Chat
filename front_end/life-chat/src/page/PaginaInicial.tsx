import { Frown } from 'lucide-react'
import api from '../services/api'
import PostCard from '../components/PostCard'
import { useEffect, useState } from 'react'
import Main from '../Main'

export interface Post {
  id: number
  username: string
  avatar: string | null
  content: string
  image: string | null
  video: string | null
  created_at: string
  likes_count: number
  liked: boolean
}

const PaginaInicial = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/feed/').then((res) => {
      setPosts(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) return <p>Carregando...</p>

  return (
    <Main className="bg-gray-900 text-white">
      <h2 className="mb-12 mt-20 text-center text-5xl">Pagina Inicial #</h2>
      <div className="mx-auto w-full px-4">
        {posts.length ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div>
            <p className="mt-60 text-center text-lg">Não temos mensagens.</p>
            <Frown size={42} className="mx-auto mt-10" />
          </div>
        )}
      </div>
    </Main>
  )
}

export default PaginaInicial
