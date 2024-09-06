// this code will bind the modifyDOM function to the btnShowOrangeDiv click event
document.getElementById('btnShowOrangeDiv').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: modifyDOM
    });
  });
});

// this code will be executed when the button btnShowOrangeDiv is clicked
function modifyDOM() {
  const version = chrome.runtime.getManifest().version;
  const div = document.createElement('div');
  div.textContent = `DOM modified by Fresh Chrome Extension boilerplate ${version} (I am in "popup.js")`;
  div.style.cssText =
    'background-color: orange; color: black; font-weight: bold; padding: 10px; width: 100%; box-sizing: border-box;';
  document.body.insertAdjacentElement('afterbegin', div);
  console.log('Action executed from popup!');

  // Extract and format text from readable elements
  const readableElements = document.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li');
  
  // Create a new div for the formatted content
  const formattedDiv = document.createElement('div');
  formattedDiv.className = 'lora-style-article';

  // Process and style each element
  readableElements.forEach(element => {
    const newElement = document.createElement(element.tagName);
    newElement.textContent = element.textContent;
    
    switch(element.tagName.toLowerCase()) {
      case 'h1':
        newElement.style.cssText = `
          font-family: 'Lora', serif;
          font-size: 2.5rem;
          line-height: 1.2;
          margin-bottom: 1rem;
        `;
        break;
      case 'h2':
        newElement.style.cssText = `
          font-family: 'Lora', serif;
          font-size: 2rem;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 1rem;
        `;
        break;
      case 'p':
        newElement.style.cssText = `
          font-family: 'Lora', serif;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        `;
        break;
      case 'a':
        newElement.style.cssText = `
          font-family: 'Lora', serif;
          color: #326891;
          text-decoration: none;
          border-bottom: 1px solid #326891;
        `;
        break;
      default:
        newElement.style.cssText = `
          font-family: 'Lora', serif;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        `;
    }
    
    formattedDiv.appendChild(newElement);
  });

  // Style the container div
  formattedDiv.style.cssText = `
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    color: #333;
  `;

  // Replace the body content with the formatted div
  document.body.innerHTML = '';
  document.body.appendChild(formattedDiv);

  // Add custom styles to the page
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    body {
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .lora-style-article {
      font-family: 'Lora', serif;
    }
    @media (max-width: 1000px) {
      .lora-style-article {
        padding: 10px;
      }
    }
  `;
  document.head.appendChild(styleElement);

}
