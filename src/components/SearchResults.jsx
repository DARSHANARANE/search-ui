import React, { useEffect, useState } from "react";
import SkeletonResult from "./SkeletonResult";
import { FaUserCircle, FaFolder, FaFileImage } from "react-icons/fa";
import Tabs from "./Tabs";
import { BiSolidRightArrow } from "react-icons/bi";
import { BsChatSquare } from "react-icons/bs";
import { PiListBold } from "react-icons/pi";
import { HiOutlineLink } from "react-icons/hi";
import { BiLinkExternal } from "react-icons/bi";


const SearchResults = ({ results, query, loading }) => {
  const [shownIndexes, setShownIndexes] = useState([]);

  useEffect(() => {
    if (query && results.length > 0 && !loading) {
      setShownIndexes([]);
      results.forEach((_, i) => {
        setTimeout(() => {
          setShownIndexes(prev => [...prev, i]);
        }, i * 400);
      });
    } else {
      setShownIndexes([]);
    }
  }, [query, results, loading]);

  const [showContainer, setShowContainer] = useState(false);
  useEffect(() => {
    if (query) {
      setTimeout(() => setShowContainer(true), 30);
    } else {
      setShowContainer(false);
    }
  }, [query]);

  const [activeTab, setActiveTab] = useState("All");
  const [showSettings, setShowSettings] = useState(false);
  const [tabVisibility, setTabVisibility] = useState({ Files: true, People: true });

  // Close settings dropdown on outside click
  useEffect(() => {
    if (!showSettings) return;
    const handleClick = (e) => {
      if (!e.target.closest('.tab-settings-dropdown') && !e.target.closest('.tab-settings-btn')) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSettings]);

  if (!query) return null; 

  // Filter results based on active tab
  let filteredResults = results;
  if (activeTab === "Files") {
    filteredResults = results.filter(item => item.type === "folder" || item.type === "image" || item.type === "video");
  } else if (activeTab === "People") {
    filteredResults = results.filter(item => item.type === "person");
  }
  else if (activeTab === "chats") {
    filteredResults = results.filter(item => item.type === "chats");
  }
   else if (activeTab === "list") {
    filteredResults = results.filter(item => item.type === "list");
  }

  // Tabs to show
  const filesCount = results.filter(item => item.type === "folder" || item.type === "image" || item.type === "video").length;
  const peopleCount = results.filter(item => item.type === "person").length;
  const chatsCount = results.filter(item => item.type === "chats").length;
  const listCount = results.filter(item => item.type === "list").length;
  const visibleTabs = [
    { key: "All", label: "All", count: results.length },
    ...(tabVisibility.Files ? [{ key: "Files", label: "Files", count: filesCount }] : []),
    ...(tabVisibility.People ? [{ key: "People", label: "People", count: peopleCount }] : []),
    ...(tabVisibility.chats ? [{ key: "Chats", label: "Chats", count: chatsCount }] : []),
    ...(tabVisibility.list ? [{ key: "List", label: "List", count: listCount }] : []),
  ];

  return (
    <div
      className={` w-full max-w-lg  transition-all duration-500 ease-out transform ${showContainer ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      style={{ pointerEvents: showContainer ? 'auto' : 'none' }}
    >
      {/* Tabs */}

      <Tabs
        tabs={visibleTabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        tabVisibility={tabVisibility}
        setTabVisibility={setTabVisibility}
      />

      {/* Results */}
      <div className="mb-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonResult key={i} />)
        ) : filteredResults.length > 0 ? (
          filteredResults.map((item, i) => (
            <div className="hover:bg-gray-100 px-4 group">
              <div
                key={i}
                className={`flex items-center gap-3 py-2 border-b cursor-pointer overflow-hidden transition-all duration-700 ease-out transform ${shownIndexes.includes(results.indexOf(item)) ? 'opacity-100 translate-y-0 max-h-32' : 'opacity-0 -translate-y-2 max-h-0'}`}
                style={{
                  transitionProperty: 'background, box-shadow, transform, opacity, max-height',
                  minHeight: shownIndexes.includes(results.indexOf(item)) ? 56 : 0,
                }}
              >
                <div className="relative">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md ">
                    {/* Icon */}
                    {item.type === "person" && <FaUserCircle size={20} className="text-gray-400" />}
                    {item.type === "folder" && <FaFolder size={14} className="text-gray-400" />}
                    {item.type === "image" && <FaFileImage size={14} className="text-gray-400" />}
                    {item.type === "video" && <BiSolidRightArrow size={14} className="text-gray-400" />}
                    {item.type === "list" && <PiListBold size={14} className="text-gray-400" />}
                    {item.type === "chat" && <BsChatSquare size={14} className="text-gray-400" />}
                  </div>
                  {item.type === "person" && (
                    <span
                      className={`absolute bottom-0 left-6 w-3 h-3 rounded-full border-[3px] border-white ${
                        item.status === 'available'
                          ? 'bg-green-500'
                          : item.status === 'not available'
                          ? 'bg-red-500'
                          : 'bg-yellow-400'
                      }`}
                      title={item.status || 'neutral'}
                    />
                  )}
                </div>
                {/* Text */}
                <div className="flex-1 gap-1">
                  <p className="font-medium">{highlight(item.name, query)}</p>
                  <p className="text-xs text-gray-400">{item.details}</p>
                </div>
                {/* Actions: Copy & Open in New Tab (only on hover) */}
                <div className="flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="text-xs p-1 rounded-md  hover:bg-gray-200  active:bg-gray-200" 
                    title="Copy Link"
                    onClick={() => navigator.clipboard.writeText(item.name)}
                  >
                   <HiOutlineLink   size={18}  className="text-gray-500" />
                  </button>
                  {item.url && (
                    <button
                       className=" flex gap-1 text-gray-400 text-xs p-1 rounded-md   hover:bg-gray-200  active:bg-gray-200" 
                      title="Open in new tab"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      <BiLinkExternal size={18}  className="text-gray-500" />
                      New Tab
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">No results found</p>
        )}
      </div>
    </div>
  );
};

// highlight search term in result name
function highlight(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-orange-100">{p}</span>
    ) : (
      p
    )
  );
}

export default SearchResults;
