import { Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import Perfil from '../page/Perfil'
import PaginaInicial from '../page/PaginaInicial'
import Profile from '../page/Profile'
import Reels from '../page/Reels'
import Search from '../page/Search'
import Messages from '../page/Messages'
import PrivateRoute from './PrivateRoutes'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/perfil/"
      element={
        <PrivateRoute>
          <Perfil />
        </PrivateRoute>
      }
    >
      <Route index element={<PaginaInicial />} />
      <Route path="pagina-inicial" element={<PaginaInicial />} />
      <Route path="profile" element={<Profile />} />
      <Route path="reels" element={<Reels />} />
      <Route path="search" element={<Search />} />
      <Route path="messages" element={<Messages />} />
    </Route>
  </Routes>
)

export default Rotas
