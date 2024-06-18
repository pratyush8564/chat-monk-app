interface ModalProps {
    isOpen: boolean;
    position: { top: number; left: number };
    handleUnreadMessage: () => void;
    handleDeleteUser: () => void;
    handleModalClose: () => void;
  }
  
  const Modal: React.FC<ModalProps> = ({
    isOpen,
    position,
    handleUnreadMessage,
    handleDeleteUser,
    handleModalClose,
  }:any) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed z-10 bg-white p-4 rounded shadow-md"
        style={{ top: position.top, left: position.left }}
      >
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={handleUnreadMessage}
        >
          Mark as Unread
        </button>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={handleDeleteUser}
        >
          Delete
        </button>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          onClick={handleModalClose}
        >
          Cancel
        </button>
      </div>
    );
  };
  
  export default Modal;
  