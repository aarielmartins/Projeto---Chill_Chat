import { useState } from 'react'
import api from '../../services/api'
import Botao from '../Botao'

interface Props {
  postId: number
}

export interface Comment {
  id: number
  username: string
  content: string
  created_at: string
}

const SecaoComentarios = ({ postId }: Props) => {
  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')

  const loadComments = async () => {
    const res = await api.get(`/posts/${postId}/comments/`)
    setComments(res.data)
  }

  const toggle = () => {
    setOpen(!open)
    if (!open) loadComments()
  }

  const send = async () => {
    if (!text) return

    const res = await api.post(`/posts/${postId}/comment/`, {
      content: text
    })

    setComments([res.data, ...comments])
    setText('')
    toggle()
  }

  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <Botao
          onClick={toggle}
          className="w-30 mb-4 mt-2 flex h-8 cursor-pointer items-center justify-center rounded-md bg-white/5 p-4 text-white ring-1 ring-white/10 transition-all duration-200 hover:ring-indigo-500 active:scale-[0.96] active:ring-2 active:ring-indigo-500 [&:hover]:bg-white/10 [&:hover]:ring-2"
        >
          Comentários
        </Botao>
      </div>

      {open && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-24 w-full resize-none rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />

          <Botao
            onClick={send}
            className="w-30 mt-2 flex h-8 cursor-pointer items-center justify-center rounded-md bg-white/5 p-4 text-white ring-1 ring-white/10 transition-all duration-200 hover:ring-indigo-500 active:scale-[0.96] active:ring-2 active:ring-indigo-500 [&:hover]:bg-white/10 [&:hover]:ring-2"
          >
            Enviar
          </Botao>

          {comments.map((c) => (
            <div key={c.id} className="mt-2 rounded bg-gray-800 p-2">
              <b>@{c.username}</b>
              <p>{c.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default SecaoComentarios
