document.addEventListener('focusin', (event) => {
  if (event.target.classList.contains('msg-form__contenteditable')) {
    // Create and show the AI icon
    let aiIcon = document.createElement('div');
    aiIcon.innerHTML = '🤖';
    aiIcon.style.position = 'absolute';
    aiIcon.style.right = '10px';
    aiIcon.style.top = '10px';
    aiIcon.style.cursor = 'pointer';
    aiIcon.id = 'ai-icon';
    event.target.parentNode.appendChild(aiIcon);

    aiIcon.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openModal' });
    });
  }
});

document.addEventListener('focusout', (event) => {
  if (event.target.classList.contains('msg-form__contenteditable')) {
    // Remove the AI icon
    let aiIcon = document.getElementById('ai-icon');
    if (aiIcon) {
      aiIcon.remove();
    }
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'insertReply') {
    const messageBox = document.querySelector('.msg-form__contenteditable');
    const messagePara = messageBox.querySelector('p');
    if (messagePara) {
      messagePara.innerText = request.reply;
      sendResponse({ status: 'success' });
    }
  }
});


