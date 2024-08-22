import { HTMLElementButton } from './HtmlElementButton';

export class HTMLElementPrompt extends HTMLElement {
  public static readonly ClassName: string = 'html-element-prompt';
  constructor(title: string, body: string, buttons: HTMLElementButton[]) {
    super();

    //CSS name is static, since element is a strong typed class
    this.className = HTMLElementPrompt.ClassName;
    this.style.position = 'absolute';
    this.style.width = '100%';
    this.style.height = '100%';
    this.style.userSelect = 'none';

    //
    const backgroundDiv = document.createElement('div');
    backgroundDiv.className = 'html-element-background';
    backgroundDiv.style.backgroundColor = 'black';
    backgroundDiv.style.opacity = '0.5';
    backgroundDiv.style.width = '100%';
    backgroundDiv.style.height = '100%';
    this.appendChild(backgroundDiv);

    const panelDiv = document.createElement('div');
    panelDiv.className = 'html-element-panel';
    panelDiv.style.border = '2px solid white';
    panelDiv.style.backgroundColor = '#2e6da5';
    panelDiv.style.position = 'absolute';
    panelDiv.style.display = 'flex';
    panelDiv.style.flexDirection = 'column';
    this.appendChild(panelDiv);
    //
    const titleDiv = document.createElement('div');
    titleDiv.className = 'html-element-title';
    titleDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    titleDiv.style.color = 'white';
    titleDiv.style.padding = '10px';
    titleDiv.style.textAlign = 'center';
    titleDiv.innerText = title;
    panelDiv.appendChild(titleDiv);

    //
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'html-element-body';
    bodyDiv.style.flex = '1';
    bodyDiv.style.padding = '10px';
    bodyDiv.style.color = 'white';
    bodyDiv.innerText = body;
    panelDiv.appendChild(bodyDiv);

    //
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'html-element-buttons';
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.justifyContent = 'end';
    buttonsDiv.style.padding = '10px';
    panelDiv.appendChild(buttonsDiv);

    //
    buttons.map((button) => {
      //CSS name is static, since element is a strong typed class
      button.className = HTMLElementButton.ClassName;
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      button.style.color = 'white';
      button.style.padding = '10px';
      button.style.textAlign = 'center';

      buttonsDiv.appendChild(button);
    });

    //
  }
}
customElements.define(HTMLElementPrompt.ClassName, HTMLElementPrompt);
