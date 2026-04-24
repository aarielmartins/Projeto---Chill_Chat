import { useState } from 'react'
import Logo from '../../assets/images/logoChat.png'
import { RegisterData, registerUser } from '../../services/authServices'
import { useNavigate } from 'react-router'
import { EyeClosed, EyeOpen } from '../../EyeIcons'
import { AxiosError } from 'axios'
import { useAuth } from '../../context/AutContext'

type SignUpProps = {
  onSwitch: () => void
}

type RegisterErrors = {
  username?: string
  email?: string
  password?: string
  confirm_password?: string
  non_field_errors?: string
}

type RegisterErrorResponse = {
  username?: string[]
  email?: string[]
  password?: string[]
  confirm_password?: string[]
  non_field_errors?: string[]
}

const SignUp = ({ onSwitch }: SignUpProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errors, setErrors] = useState<RegisterErrors>({})
  const navigate = useNavigate()

  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: undefined
    }))
  }

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirm_password) {
      setErrors({ confirm_password: 'As senhas não coincidem' })
      return
    }

    try {
      const res = await registerUser(formData)

      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      login(res.data.access, res.data.refresh)
      navigate('/Perfil')
    } catch (err) {
      if (!(err instanceof AxiosError)) return
      const data = err.response?.data as RegisterErrorResponse

      if (!data) return
      const fieldErrors: RegisterErrors = {}

      if (data?.username) {
        fieldErrors.username = data.username[0]
      }

      if (data?.email) {
        fieldErrors.email = data.email[0]
      }

      if (data?.password) {
        fieldErrors.password = data.password[0]
      }

      if (data?.confirm_password) {
        fieldErrors.confirm_password = data.confirm_password[0]
      }

      if (data?.non_field_errors) {
        fieldErrors.confirm_password = data.non_field_errors[0]
      }
      setErrors(fieldErrors)
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={Logo} alt="Your Company" className="mx-auto h-auto w-80" />
        <h2 className="mt-10 text-center text-2xl/9 tracking-tight text-white">Criar conta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">
              Nome Perfil
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="username"
                name="username"
                required
                autoComplete="current-username"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 ${errors.username ? 'border border-red-500' : 'border border-gray-300'} text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
              />
              {errors.username && <p className="text-center text-sm text-red-500">{errors.username}</p>}
            </div>
          </div>

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
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 ${errors.email ? 'border border-red-500' : 'border border-gray-300'} text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
              />
              {errors.email && <p className="text-center text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                Senha
              </label>
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
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 ${errors.password ? 'border border-red-500' : 'border border-gray-300'} text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 ${errors.password ? 'bottom-[20px] top-[0px]' : 'inset-y-0'}`}
              >
                {showPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
              {errors.password && <p className="text-center text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirm_password" className="block text-sm/6 font-medium text-gray-100">
                Confirmar Senha
              </label>
            </div>
            <div className="relative mt-2">
              <input
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_password"
                required
                autoComplete="current-confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 ${errors.confirm_password ? 'border border-red-500' : 'border border-gray-300'} text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className={`absolute right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 ${errors.confirm_password ? 'bottom-[20px] top-[0px]' : 'inset-y-0'}`}
              >
                {showConfirmPassword ? <EyeClosed /> : <EyeOpen />}
              </button>
              {errors.confirm_password && <p className="text-center text-sm text-red-500">{errors.confirm_password}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full cursor-pointer justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 [&:hover]:bg-indigo-400"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Vc já tem uma conta?{' '}
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300" onClick={onSwitch}>
            Entrar
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
