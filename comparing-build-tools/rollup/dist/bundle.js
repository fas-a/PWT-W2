(function () {
    'use strict';

    function exampleComponent() {
      const element = document.createElement('div');
      element.innerHTML = `<p>This is an example component rendered by JavaScript.</p>`;
      element.style.border = "1px solid #0066cc";
      element.style.padding = "10px";
      element.style.backgroundColor = "#e0e0e0";
      return element;
    }

    document.getElementById('app').appendChild(exampleComponent());

})();
