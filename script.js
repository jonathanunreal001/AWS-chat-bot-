document.addEventListener('DOMContentLoaded', function() {

  const chatLog = document.getElementById('chat-log');

  const userInput = document.getElementById('user-input');

  const sendButton = document.getElementById('send-button');

  // Event listener for when the user clicks the "Send" button or presses Enter

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keypress', function(event) {

    if (event.keyCode === 13) {

      sendMessage();

    }

  });

  function sendMessage() {

    const message = userInput.value.trim();

    if (message !== '') {

      // Clear user input field

      userInput.value = '';

      // Append user message to the chat log

      appendMessage('You', message);

      // Send user message to the backend

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

  // Replace 'yourambda-endpoint' with the actual endpoint of your AWS Lambda function

  const endpoint = 'https://ofguzoy212.execute-api.ap-south-1.amazonaws.com/default/ChatGPT';

  const apiKey = 'CG5c4UcJq86cTO2zuGD078DBKYcKXIfHaWjo4ato';  // Replace with the API key required by your backend

  fetch(endpoint, {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json',

      'x-api-key': apiKey,

    },

    body: JSON.stringify({

      queryStringParameters: {

        apiKey: apiKey,

      },

      body: {

        input: message,

      },

    }),

  })

  .then(response => response.text())

  .then(botResponse => {

    // Append bot response to the chat log

    appendMessage('Chatbot', botResponse);

  })

  .catch(error => console.error('Error:', error));

}
  
  



  
  
