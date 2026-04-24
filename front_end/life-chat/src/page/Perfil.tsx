import BarraLateralDireita from '../components/BarraLateralDireita'
import Main from '../Main'
import '../styles/global.css'
import { Outlet } from 'react-router-dom'
import BarraLateral from '../components/BarraLateral'
import { useState } from 'react'
import Modal from '../components/Modal'

type ModalType = 'post' | 'configure' | null

const Perfil = () => {
  const [modalType, setModalType] = useState<ModalType>(null)
  return (
    <>
      <div className="app-layout">
        <aside className="aside-compact w-60 flex-shrink-0 md:w-72 lg:w-80 xl:w-96">
          <BarraLateral onAbrirConfig={() => setModalType('configure')} />
        </aside>
        <Main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <Outlet />
          </div>
        </Main>
        <div className="aside-compact w-60 flex-shrink-0 md:w-72 lg:w-80 xl:w-96">
          <BarraLateralDireita onAbrirPost={() => setModalType('post')} />
        </div>
      </div>
      <Modal tipo={modalType} onClose={() => setModalType(null)} />
    </>
  )
}

export default Perfil
