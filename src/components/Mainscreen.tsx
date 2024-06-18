import { attachmentIcon, phoneIcon, sendIcon, threeDotsIcon, videoIcon, voiceIcon } from "../assets/Icon";
import { UserChat } from "./FakeData";

interface MainScreenProps {
  currentChat: UserChat | null;
  handleBackToChats: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ currentChat, handleBackToChats }:any) => {
  return (
    <div >
      {currentChat && (
        <>
          <div className="flex justify-between bg-[#F6F6F6]">
            <div className="flex">
              <button onClick={handleBackToChats} className="mr-2 lg:hidden">
                Back
              </button>
              <img
                src={currentChat.profilePictureURL}
                alt={currentChat.name}
                className="w-12 h-12 rounded-full mr-2"
              />
              <div className="flex flex-col ml-2">
                <p className="font-semibold">{currentChat.name}</p>
                <p className="font-light text-sm">Click here for contact info</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-3">
              <div>{videoIcon}</div>
              <div>{phoneIcon}</div>
              <div>{threeDotsIcon}</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {currentChat.chat.map((message:any, index:any) => {
              const userId = currentChat.userId;
              return (
                <div key={index}>
                  {message[userId] && (
                    <div className="flex justify-start">
                      <div className="bg-[#FAFAFA] p-2 rounded-[44px] mt-3 flex flex-col items-start">
                        <h1>{message[userId].message}</h1>
                        <p className="text-xs">{message[userId].timeStamp}</p>
                      </div>
                    </div>
                  )}
                  {"you" in message && (
                    <div className="flex justify-end">
                      <div className="bg-[#DCF7C5] p-2 rounded-[44px] mt-3 flex flex-col w-auto items-end">
                        <h1>{message.you.message}</h1>
                        <p className="text-xs">{message.you.timeStamp}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="fixed  bottom-0 sm:right-0 sm:w-screen  max-sm:w-screen md:w-screen lg:w-3/4 p-4 bg-white ">
      <div className="flex items-center">
        <p>{attachmentIcon}</p>
        <p className="ml-2">{voiceIcon}</p>
        <input
          type="text"
          name="chat"
          placeholder="Type message here"
          className="flex-1 border border-gray-400 rounded-full h-8 ml-2 p-2"
        />
        <span className="mr-8 absolute right-0 ">{sendIcon}</span>
      </div>
    </div>
        </>
      )}
    </div>
  );
};

export default MainScreen;
