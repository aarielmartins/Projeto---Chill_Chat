import { useState } from 'react'
import Logo from '../../assets/images/logoChat.png'
import { LoginData, loginUser } from '../../services/authServices'
import { useNavigate } from 'react-router-dom'
import { EyeClosed, EyeOpen } from '../../EyeIcons'
import { AxiosError } from 'axios'
import { useAuth } from '../../context/AutContext'

type LoginProps = {
  onSwitch: () => void
}

const Login = ({ onSwitch }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)

      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)

      login(res.data.access, res.data.refresh)
      navigate('/Perfil')
    } catch (err) {
      const error = err as AxiosError
      const status = error.response?.status
      if (status === 400 || status === 401) {
        setError('Email ou senha inválidos')
      } else {
        setError('Erro inesperado. Tente novamente.')
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={Logo} alt="Your Company" className="mx-auto h-auto w-80" />
        <h2 className="mt-10 text-center text-2xl/9 tracking-tight text-white">Faça login na sua conta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
              E-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="current-email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 ${error ? 'border border-red-500' : 'border border-gray-300'} text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                Senha
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 ${error ? 'border border-red-500' : 'border border-gray-300'} text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 ${error ? 'bottom-[34px] top-[0px]' : 'inset-y-0'}`}
              >
                {showPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
              {error && <p className="py-2 text-center text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 [&:hover]:bg-indigo-400"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Não tem uma conta?{' '}
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300" onClick={onSwitch}>
            Increva-se
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
