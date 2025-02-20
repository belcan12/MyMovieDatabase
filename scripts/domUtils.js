
export function createElement(type, attributes = {}, ...children) {
    const elem = document.createElement(type);
    for (const key in attributes) {
      if (key === 'className') {
        elem.className = attributes[key];
      } else if (key.startsWith('data-')) {
        elem.setAttribute(key, attributes[key]);
      } else {
        elem[key] = attributes[key];
      }
    }
    children.forEach(child => {
      if (typeof child === 'string') {
        elem.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        elem.appendChild(child);
      }
    });
    return elem;
  }
  