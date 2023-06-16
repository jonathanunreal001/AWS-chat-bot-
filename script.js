document.addEventListener('DOMContentLoaded', function() {

  const chatLog = document.getElementById('chat-log');

  const userInput = document.getElementById('user-input');

  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keypress', function(event) {

    if (event.keyCode === 13) {

      sendMessage();

    }

  });

  function sendMessage() {

    const message = userInput.value.trim();

    if (message !== '') {

      userInput.value = '';

      appendMessage('You', message);

      sendToBackend(message);

    }

  }

  function appendMessage(sender, message) {

    const messageElement = document.createElement('div');

    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;

    chatLog.appendChild(messageElement);

    chatLog.scrollTop = chatLog.scrollHeight;

  }

  function sendToBackend(message) {

    const endpoint = 'https://dlu7znj2i0.execute-api.ap-south-1.amazonaws.com/ChatGPTapi/myapiresource';

    fetch(endpoint, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify({

        input: message,

      }),

    })

      .then(response => response.json())

      .then(data => {

        const botResponse = data.body;

        console.log('Received response from backend:', botResponse); // Add this line for debugging

        appendMessage('Chatbot', botResponse);

      })

      .catch(error => console.error('Error:', error));

  }

});
