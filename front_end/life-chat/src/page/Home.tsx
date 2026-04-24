import { useState } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const Home = () => {
  const [mode, setMode] = useState('login')
  return (
    <>
      {mode === 'login' ? <Login onSwitch={() => setMode('signup')} /> : <SignUp onSwitch={() => setMode('login')} />}
    </>
  )
}

export default Home
