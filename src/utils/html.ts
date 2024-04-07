export function createElementFromHTML(htmlString: string) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
export function HTMLElementToString(htmlString: HTMLElement | Node) {
  var div = document.createElement('div');
  div.appendChild(htmlString);
  return div.innerHTML;
}
