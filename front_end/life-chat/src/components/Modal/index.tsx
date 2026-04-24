import Configure from '../Configure'
import Post from '../Post'

type ModalType = 'post' | 'configure' | null

type Props = {
  onClose: () => void
  tipo: ModalType
}

const Modal = ({ onClose, tipo }: Props) => {
  if (!tipo) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div
        className="flex w-[680px] flex-col rounded-md border border-white/10 bg-gray-900 p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {tipo === 'post' && <Post onClose={onClose} />}
        {tipo === 'configure' && <Configure onClose={onClose} />}
      </div>
    </div>
  )
}

export default Modal
