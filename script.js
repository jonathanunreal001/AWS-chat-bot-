document.addEventListener('DOMContentLoaded', function() {

  const chatLog = document.getElementById('chat-log');

  const userInput = document.getElementById('user-input');

  const sendButton = document.getElementById('send-button');

  const apiKey = 'CG5c4UcJq86cTO2zuGD078DBKYcKXIfHaWjo4ato'; // Replace with your actual API key

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

    const endpoint = 'https://ofguzoy212.execute-api.ap-south-1.amazonaws.com/default/ChatGPT';

    fetch(endpoint, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

        'x-api-key': apiKey,

      },

      body: JSON.stringify({

        apiKey: apiKey,

        input: message,

      }),

    })

    .then(response => response.text())

    .then(botResponse => {

      appendMessage('Chatbot', botResponse);

    })

    .catch(error => console.error('Error:', error));

  }

});




