export class HTMLElementButton extends HTMLElement {
  public static readonly ClassName: string = 'html-element-button';
  constructor(title: string, onClick: (arg0: HTMLElementButton) => void) {
    super();
    this.innerText = title;
    this.onclick = () => onClick(this);
  }
}

customElements.define(HTMLElementButton.ClassName, HTMLElementButton);
