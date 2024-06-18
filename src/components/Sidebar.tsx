import { threeDotsIcon } from "../assets/Icon";
import { UserChat } from "./FakeData";

interface SidebarProps {
  chats: UserChat[];
  isChatOpen: boolean;
  handleChatSelect: (chat: UserChat) => void;
  handleModalOpen: (event: React.MouseEvent, chat: UserChat) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  handleChatSelect,
  handleModalOpen,
}:any) => {
  return (
    <div >
      <p className="text-lg mb-4">Chats</p>
      {chats.map((chat:any) => {
        const lastMessage =
          chat.chat[chat.chat.length - 1][chat.userId]?.message ||
          chat.chat[chat.chat.length - 1].you.message;

        return (
          <div
            className="flex items-center mt-4 p-1 hover:bg-[#F5F7FB]"
            key={chat.userId}
            onClick={() => handleChatSelect(chat)}
          >
            <div className="flex">
              <img
                src={chat.profilePictureURL}
                alt={chat.name}
                className="w-12 h-12 rounded-full mr-2 mt-2"
              />
            </div>
            <div className="flex flex-col ml-2 justify-between items-start">
              <p className="font-semibold">{chat.name}</p>
              <p className="text-gray-500 text-sm">{lastMessage}</p>
            </div>
            <div
              className="relative ml-auto flex"
              onClick={(e) => handleModalOpen(e, chat)}
            >
              {chat.unreadCount > 0 && (
                <p className="rounded-full bg-green-500 text-white text-center px-2 py-1 text-xs">
                  {chat.unreadCount}
                </p>
              )}
              {threeDotsIcon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
