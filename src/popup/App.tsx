import React, { useState } from 'react';
import '../css/tailwind.css';


const App = () => {
  const [reply, setReply] = useState('');

  const generateReply = () => {
    setReply('Thank you for the opportunity!');
  };

  const handleInsertClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'insertReply', reply });
    });
  };

  return (
    <div className="w-[400px] h-[400px] rounded-lg flex flex-col justify-start items-center mt-5">
      <h1 className="text-xl font-bold mb-2">LinkedIn Message Reply Generator</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded my-3"
        onClick={generateReply}
      >
        Generate Reply
      </button>
      <p className="mt-3 text-lg font-mono font-medium">{reply}</p>

      <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleInsertClick}
        >
          Insert
        </button>
    </div>
  );
};

export default App;
