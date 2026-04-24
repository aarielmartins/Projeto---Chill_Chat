import { useEffect, useState } from 'react'
import Main from '../Main'
import menager from '../assets/images/menager.png'
import Botao from '../components/Botao'
import { SquareX as Close } from 'lucide-react'
import { Frown } from 'lucide-react'
import api from '../services/api'

interface Message {
  username: string
}

const Messages = () => {
  const [visivel, setVisivel] = useState(false)
  const [mensagem, setMensagem] = useState(String)
  const [enviado, setEnviado] = useState(false)
  const [fechar, setFechar] = useState(false)
  const [temMensagem, setTemMensagem] = useState(true)
  const [profile, setProfile] = useState<Message | null>(null)

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

  const handleEnviar = () => {
    if (!mensagem.trim()) return
    setEnviado(true)
  }

  const fecharMessage = () => {
    setFechar(true)
  }

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <Main className="flex w-full items-center justify-center bg-gray-900 text-white">
      <div>
        <h2 className="mb-12 mt-20 text-center text-5xl">Mensagens #</h2>
        {temMensagem ? (
          <div
            className={`layoutMain flex w-[780px] flex-col rounded-md border border-white/10 bg-gray-900 p-8 text-white ${fechar ? 'hidden' : 'block'}`}
          >
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-300 pb-4">
              <div className="flex items-center justify-start gap-4">
                <img className="w-20 rounded-full" src={menager} alt="foto perfil" />
                <p className="text-2xl text-blue-300">@Manager</p>
              </div>
              <div>
                <Close
                  onClick={() => {
                    fecharMessage()
                    setTemMensagem(false)
                  }}
                  className="cursor-pointer [&:hover]:text-blue-300"
                />
              </div>
            </div>
            <div>
              <h2 className="mb-4 font-bold">Bem-vindo ao Life Chat!</h2>
              <p>Oi {formatName(profile.username)}, ficamos muito feliz com a tua presença na plataforma.</p>
              <p>Esperamos que você possa contribuir com o seu conhecimento e assim criar ótimas relações!</p>
              <p>Att. Life Chat.</p>
            </div>
            <div className="flex items-center justify-end">
              <Botao
                onClick={() => setVisivel(true)}
                className="w-30 mt-6 flex h-8 items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 hover:outline-indigo-500"
              >
                Responder
              </Botao>
            </div>
            <div className={visivel ? 'block' : 'hidden'}>
              <div>
                <textarea
                  className="mt-4 h-32 w-full resize-none rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 focus:outline-indigo-500"
                  placeholder="Escreva aqui."
                  onChange={(e) => setMensagem(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center justify-end">
                <Botao
                  onClick={() => {
                    setVisivel(false)
                    handleEnviar()
                  }}
                  className="w-30 mt-2 flex h-8 items-center justify-center rounded-md bg-gray-800 bg-white/5 p-4 placeholder-gray-400 outline-1 outline-white/10 hover:outline-indigo-500"
                >
                  Enviar
                </Botao>
              </div>
            </div>
            {enviado && <p className="mt-2 text-center text-sm text-blue-300">{'Resposta enviada!'}</p>}
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

export default Messages
