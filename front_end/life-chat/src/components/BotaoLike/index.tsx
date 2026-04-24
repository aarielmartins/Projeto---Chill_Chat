import { useState } from 'react'
import api from '../../services/api'
import { Star } from 'lucide-react'
import type { Post } from '../../page/PaginaInicial'

interface Props {
  post: Post
}

const BotaoLike = ({ post }: Props) => {
  const [liked, setLiked] = useState(post.liked)
  const [count, setCount] = useState(post.likes_count)

  const handleLike = async () => {
    await api.post(`/posts/${post.id}/like/`)

    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <Star
        size={32}
        onClick={handleLike}
        className={`cursor-pointer ${liked ? 'fill-yellow-400 text-yellow-400' : ''}`}
      />
      <span>{count}</span>
    </div>
  )
}

export default BotaoLike
