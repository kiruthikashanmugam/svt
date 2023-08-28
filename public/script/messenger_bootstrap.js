
(function (global) {
  'use strict';

  const nonce = window['dfBootstrapNonce'];

  var CUSTOM_ELEMENTS_ADAPTER_URL =
  'https://svt.movex.ai/script/CUSTOM_ELEMENTS_ADAPTER_URL.js'
  var WEBCOMPONENTS_LOADER_URL =
  'https://svt.movex.ai/script/WEBCOMPONENTS_LOADER_URL.js';
  var MESSENGER_URL =
  'https://svt.movex.ai/script/MESSENGER_URL.js';

  var loadDfMessenger = function () {
    var elementScript = document.createElement('script');
    elementScript.addEventListener('load', onMessengerLoaded, false);
    elementScript.src = MESSENGER_URL;
    if (nonce) {
      elementScript.setAttribute('nonce', nonce);
    }
    global.document.body.insertBefore(elementScript, null);
  };

  var onMessengerLoaded = function () {
    window.dispatchEvent(new Event('dfMessengerLoaded'))
  };

  var loadWebComponentPolyfills = function () {
    var customElementsAdapterTag = document.createElement('script');
    if (global.customElements) {
      // Import custom elements adapter which is needed for Custom element
      // classes transpiled to ES5.
      customElementsAdapterTag.src = CUSTOM_ELEMENTS_ADAPTER_URL;
      if (nonce) {
        customElementsAdapterTag.setAttribute('nonce', nonce);
      }
      document.head.appendChild(customElementsAdapterTag);
    }
    // Import web components loader which loads polyfills based on browser
    // support.
    const webComponentsLoaderTag = document.createElement('script');
    webComponentsLoaderTag.src = WEBCOMPONENTS_LOADER_URL;
    if (nonce) {
      webComponentsLoaderTag.setAttribute('nonce', nonce);
    }
    global.document.head.appendChild(webComponentsLoaderTag);
  };

  global.addEventListener('WebComponentsReady', loadDfMessenger, false);

  var raf = global.requestAnimationFrame || global.mozRequestAnimationFrame ||
      global.webkitRequestAnimationFrame || global.msRequestAnimationFrame;
  if (raf) {
    raf(function () {
      global.setTimeout(loadWebComponentPolyfills, 0);
    });
  } else {
    global.addEventListener('load', loadWebComponentPolyfills);
  }
})(window);
