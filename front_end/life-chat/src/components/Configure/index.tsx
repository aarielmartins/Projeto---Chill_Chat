import { SquareX as Close } from 'lucide-react'
import { useState } from 'react'
import Botao from '../Botao'
import api from '../../services/api'

type Props = {
  onClose?: () => void
}

const Configure = ({ onClose }: Props) => {
  const [imagemFundo, setImagemFundo] = useState<File | null>(null)
  const [imagemPerfil, setImagemPerfil] = useState<File | null>(null)
  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [profissao, setProfissao] = useState('')
  const [bio, setBio] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      if (imagemPerfil) formData.append('avatar', imagemPerfil)
      if (imagemFundo) formData.append('cover_photo', imagemFundo)
      if (nome) formData.append('full_name', nome)
      if (dataNascimento) formData.append('birth_date', dataNascimento)
      if (profissao) formData.append('profession', profissao)
      if (telefone) formData.append('phone', telefone)
      if (bio) formData.append('bio', bio)

      if (username) {
        await api.patch('profile/username/', { username })
      }

      if (password) {
        await api.patch('profile/password/', {
          password,
          confirm_password: confirmPassword
        })
      }

      await api.patch('profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      onClose?.()
      window.location.reload()
    } catch (error: unknown) {
      console.error('ERRO NO SUBMIT:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: unknown } }
        console.error('DETALHE DA API:', apiError.response?.data)
      }

      alert('Erro ao salvar perfil')
    }
  }
  return (
    <div className="max-h-screen">
      <div className="flex items-center justify-between border-b border-gray-300 pb-6">
        <h2 className="text-center text-4xl text-blue-300">Configurar Perfil</h2>
        <Close onClick={onClose} className="cursor-pointer [&:hover]:text-blue-300" />
      </div>
      <div className="configure mx-auto mt-6 block max-w-[400px]">
        <label className="mb-4 block text-center" htmlFor="imagem-fundo-perfil">
          Escolha imagem de fundo do Perfil
        </label>
        <input
          type="file"
          id="upload-fundo"
          className="hidden w-full"
          onChange={(e) => setImagemFundo(e.target.files?.[0] || null)}
        />
        <label
          htmlFor="upload-fundo"
          className="flex h-8 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 hover:outline-indigo-500"
        >
          Adicionar
        </label>
        {imagemFundo && <p className="mt-2 text-center text-sm text-blue-300">{'"' + imagemFundo.name + '"'}</p>}
      </div>
      <div className="configure mx-auto mt-6 block max-w-[400px] pb-10">
        <label className="mb-4 block text-center" htmlFor="imagem-perfil">
          Escolha imagem do Perfil
        </label>
        <input
          type="file"
          id="upload-perfil"
          className="hidden w-full"
          onChange={(e) => setImagemPerfil(e.target.files?.[0] || null)}
        />
        <label
          htmlFor="upload-perfil"
          className="flex h-8 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 hover:outline-indigo-500"
        >
          Adicionar
        </label>
        {imagemPerfil && <p className="mt-2 text-center text-sm text-blue-300">{'"' + imagemPerfil.name + '"'}</p>}
      </div>
      <div className="grid grid-cols-2 gap-6 border-t border-gray-300">
        <div>
          <label className="configure2 mb-4 mt-8 block" htmlFor="nome-completo">
            Nome Completo:
          </label>
          <input
            type="text"
            id="nome-completo"
            onChange={(e) => setNome(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 mt-8 block" htmlFor="data-nascimento">
            Data de Nascimento:
          </label>
          <input
            type="date"
            id="data-nascimento"
            onChange={(e) => setDataNascimento(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 block" htmlFor="telefone">
            Telefone:
          </label>
          <input
            type="text"
            id="telefone"
            onChange={(e) => setTelefone(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 block" htmlFor="profissao">
            Profissão:
          </label>
          <input
            type="text"
            id="profissao"
            onChange={(e) => setProfissao(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 block" htmlFor="linkedin">
            Sobre Você:
          </label>
          <input
            type="text"
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 block" htmlFor="site">
            Modificar UserName:
          </label>
          <input
            type="text"
            id="site"
            onChange={(e) => setUsername(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 block" htmlFor="site">
            Modificar Senha:
          </label>
          <input
            type="text"
            id="site"
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="configure2 mb-4 block" htmlFor="site">
            Confirmar Senha:
          </label>
          <input
            type="text"
            id="site"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex h-6 w-full cursor-pointer resize-none items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Botao
          onClick={handleSubmit}
          className="w-30 relative z-50 mt-6 flex h-12 items-center justify-center rounded-md bg-white/5 p-4 text-white ring-1 ring-white/10 transition-all duration-200 hover:bg-white/10 hover:ring-2 hover:ring-indigo-500 active:scale-[0.96] active:ring-2 active:ring-indigo-500"
        >
          Salvar
        </Botao>
      </div>
    </div>
  )
}

export default Configure
