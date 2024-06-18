import { useState } from "react";
import "./index.css";
import { UserChat, data } from "./components/FakeData";
import Sidebar from "./components/Sidebar";
import MainScreen from "./components/Mainscreen";
import Modal from "./components/Modal";

function App() {
  const [chats, setChats] = useState<UserChat[]>(data);
  const [currentChat, setCurrentChat] = useState<UserChat>(data[0]); // Initialize with the first chat
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedChat, setSelectedChat] = useState<UserChat | null>(null); // State for selected chat
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 }); // State for modal position
  const [isChatOpen, setIsChatOpen] = useState(false); // State for mobile chat view

  const handleChatSelect = (chat: UserChat) => {

    const updatedChats = chats.map((c) =>
      c.userId === chat.userId ? { ...c, unreadCount: 0 } : c
    );

    setChats(updatedChats);
    setCurrentChat(chat);

    if (!isModalOpen) {
      setCurrentChat(chat);

      if (window.innerWidth < 768) {
        setIsChatOpen(true);
      }
    }
  };
  const handleModalOpen = (event: React.MouseEvent, chat: UserChat) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const modalLeftPosition: any = `calc(${rect.left}px - 11%)`; // Adjust based on your layout
    setModalPosition({ top: rect.bottom, left: modalLeftPosition });
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedChat(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedChat) {
      const updatedChats: any = chats.filter(
        (chat) => chat.userId !== selectedChat.userId
      );
      setChats(updatedChats);
      setCurrentChat(updatedChats.length > 0 ? updatedChats[0] : null);
      handleModalClose();
    }
  };

  const handleUnreadMessage = () => {
    const ind = data.findIndex(ele => ele.userId === currentChat?.userId)
    setChats(pre => pre.map((item: UserChat, i: number) => {
      if (ind === i) return data[ind]
      return item
    }

    ))
    setIsModalOpen(false);
  }


  const handleBackToChats = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <div className="font-light flex flex-col md:flex-row">
        <div
          className={`w-full md:w-3/12  p-4  ${isChatOpen ? "hidden" : "block md:block "
            } `}
        >
          <Sidebar
            chats={chats}
            isChatOpen={isChatOpen}
            handleChatSelect={handleChatSelect}
            handleModalOpen={handleModalOpen}
          />
        </div>
        <div className="border-r border-[#EFEFEF] h-screen hidden md:block"></div>
        <div
          className={`w-full md:w-9/12  p-4 flex flex-col justify-between h-screen ${isChatOpen ? "block" : "hidden  md:block "
            }`}
        >

          <MainScreen currentChat={currentChat} handleBackToChats={handleBackToChats} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        position={modalPosition}
        handleUnreadMessage={handleUnreadMessage}
        handleDeleteUser={handleDeleteUser}
        handleModalClose={handleModalClose}
      />
    </>
  );
}

export default App;
