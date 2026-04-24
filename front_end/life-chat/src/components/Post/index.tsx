import { SquareX as Close } from 'lucide-react'
import Botao from '../Botao'
import { useState } from 'react'
import api from '../../services/api'

type Props = {
  onClose?: () => void
}

const Post = ({ onClose }: Props) => {
  const [imagem, setImagem] = useState<File | null>(null)
  const [conteudo, setConteudo] = useState('')
  const isEmpty = !conteudo.trim() && !imagem

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('content', conteudo)

      if (imagem) {
        if (imagem.type.startsWith('image/')) {
          formData.append('image', imagem)
        } else if (imagem.type.startsWith('video/')) {
          formData.append('video', imagem)
        }
      }

      if (!conteudo.trim() && !imagem) {
        alert('Escreva algo ou adicione mídia')
        return
      }

      await api.post('posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setConteudo('')
      setImagem(null)
      onClose?.()
      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Erro ao criar post')
    }
  }
  return (
    <div>
      <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-4">
        <h2 className="text-center text-4xl text-blue-300">Criar Post</h2>
        <Close onClick={onClose} className="cursor-pointer [&:hover]:text-blue-300" />
      </div>
      <div className="mb-4">
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          className="mt-4 h-32 w-full resize-none rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          placeholder="O que está acontecendo?"
        />
      </div>
      <div className="mx-auto block max-w-[400px]">
        <input
          type="file"
          id="upload"
          className="hidden w-full"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setImagem(file)
            }
          }}
        />
        <label
          htmlFor="upload"
          className="flex w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 hover:outline-indigo-500"
        >
          Adicionar imagem ou vídeo
        </label>
        {imagem && <p className="mt-2 text-center text-sm text-blue-300">{'"' + imagem.name + '"'}</p>}
      </div>
      <div className="flex items-center justify-center">
        <Botao
          onClick={handleSubmit}
          disabled={isEmpty}
          className="w-30 relative z-50 mt-6 flex h-12 items-center justify-center rounded-md bg-white/5 p-4 text-white ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10 hover:ring-2 hover:ring-indigo-500 active:scale-[0.96] active:ring-2 active:ring-indigo-500"
        >
          Postar
        </Botao>
      </div>
    </div>
  )
}

export default Post
