import BotaoLike from '../BotaoLike'
import SecaoComentarios from '../SecaoComentarios'
import type { Post } from '../../page/PaginaInicial'
import perfil from '../../assets/images/perfil.jpg'

interface Props {
  post: Post
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="layoutMain mx-auto w-[780px] rounded-md border border-white/10 bg-gray-900 p-8">
      <div className="flex justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <img className="h-16 w-16 rounded-full object-cover" src={post.avatar || perfil} />
          <p>@{post.username}</p>
        </div>

        <BotaoLike post={post} />
      </div>

      <p className="mt-4">{post.content}</p>

      {post.image && <img src={post.image} className="mt-2 rounded" />}
      {post.video && <video controls src={post.video} className="mt-2 rounded" />}

      <SecaoComentarios postId={post.id} />
    </div>
  )
}

export default PostCard
