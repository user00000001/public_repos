'use strict';

import './app.css';

(function () {
  // Communicate with background file by sending a message
  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Ove. I am from Override app.',
      },
    },
    (response) => {
      console.log(response.message);
    }
  );
})();
