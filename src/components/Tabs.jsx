import React from "react";
import { FaCog, FaUserCircle, FaPaperclip } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { SlPaperClip } from "react-icons/sl";
import { BsChatSquare } from "react-icons/bs";
import { PiListBold } from "react-icons/pi";

const Tabs = ({
  tabs,
  activeTab,
  onTabClick,
  showSettings,
  setShowSettings,
  tabVisibility,
  setTabVisibility
}) => {
  return (
    <div className="flex items-center gap-4 border-b-2 px-4 mb-4 text-gray-500 text-sm relative">
      <div className="flex gap-4">
        {tabs.map(tab => (
          <React.Fragment key={tab.key}>
            <div className={`pb-2 flex gap-1 font-semibold ${activeTab === tab.key ? "border-b-2 border-black  text-black" : "hover:text-black"}`}>
                    <div className="flex-shrink-0 flex items-center">
                        {tab.label === "People" &&  <FiUser   className="text-gray-500" size={16}/>}
                        {tab.label === "Files" &&   <SlPaperClip  className="text-gray-500"  size={16} />}
                        {tab.label === "Chats" &&   <BsChatSquare  className="text-gray-500" size={16} />}
                        {tab.label === "List" &&   <PiListBold className="text-gray-500" size={16} />}
                    </div>
            <button  onClick={() => onTabClick(tab.key)}>
              {tab.label}
            </button>
            <div className="bg-gray-100 h-5 ml-1 w-5 item-center justify-center flex text-gray-500 test-sm rounded-md">
              {tab.count !== 0 ? tab.count : 0}
            </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <button
        className={`ml-auto tab-settings-btn p-1 rounded-md hover:bg-gray-100 active:bg-gray-100${showSettings ? ' bg-gray-100 tran' : ''}`}
        aria-label="Tab settings"
        onClick={() => setShowSettings(v => !v)}
         style={{
           transition: 'transform 1s',
           transform: showSettings ? 'rotate(360deg)' : 'rotate(0deg)'
         }}
      >
        <IoSettingsOutline  size={18} />
      </button>
      {showSettings && (
        <div className="tab-settings-dropdown absolute right-4 top-9 z-10 bg-white shadow-lg rounded-lg py-2 px-3 min-w-[160px] border">
          <div className="flex items-center gap-2 py-1">
            <SlPaperClip  className="text-gray-500"  size={16} />
            <span className={`flex-1 ${tabVisibility.Files ? 'text-black' : ''}`}>Files</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tabVisibility.Files}
                onChange={() => setTabVisibility(v => ({ ...v, Files: !v.Files }))}
                className="sr-only"
              />
              <span className={`pl-0.5 w-[20px] h-3 flex items-center py-1.5  rounded-full border-bg-gray-200 ${tabVisibility.Files  ? 'bg-black' : 'bg-gray-200'}`}>
                <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-200 bg-white ${tabVisibility.Files  ? ' translate-x-2' : ''}`}></span>
              </span>
            </label>
          </div>
          <div className="flex items-center gap-2 py-1">
            <FiUser   className="text-gray-500" size={16}/>
            <span className={`flex-1 ${tabVisibility.People ? 'text-black' : ''}`}>People</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tabVisibility.People}
                onChange={() => setTabVisibility(v => ({ ...v, People: !v.People }))}
                className="sr-only"
              />
               <span className={`pl-0.5 w-[20px] h-3 flex items-center py-1.5  rounded-full border-bg-gray-200  ${tabVisibility.People  ? 'bg-black' : 'bg-gray-200'}`}>
                <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-200 bg-white ${tabVisibility.People  ? ' translate-x-2' : ''}`}></span>
              </span>
            </label>
          </div>
            <div className="flex items-center gap-2 py-1">
            <BsChatSquare  className="text-gray-500" size={16} />
            <span className={`flex-1 ${tabVisibility.chats ? 'text-black' : ''}`}>Chats</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tabVisibility.chats}
                onChange={() => setTabVisibility(v => ({ ...v, chats: !v.chats }))}
                className="sr-only"
              />
               <span className={`pl-0.5 w-[20px] h-3 flex items-center py-1.5  rounded-full border-bg-gray-200  ${tabVisibility.chats  ? 'bg-black' : 'bg-gray-200'}`}>
                <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-200 bg-white ${tabVisibility.chats  ? ' translate-x-2' : ''}`}></span>
              </span>
            </label>
          </div>
        <div className="flex items-center gap-2 py-1">
           <PiListBold className="text-gray-500" size={16} />
            <span className={`flex-1 ${tabVisibility.list ? 'text-black' : ''}`}>List</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tabVisibility.list}
                onChange={() => setTabVisibility(v => ({ ...v, list: !v.list }))}
                className="sr-only"
              />
               <span className={`pl-0.5 w-[20px] h-3 flex items-center py-1.5  rounded-full border-bg-gray-200  ${tabVisibility.list  ? 'bg-black' : 'bg-gray-200'}`}>
                <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-200 bg-white ${tabVisibility.list  ? ' translate-x-2' : ''}`}></span>
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
