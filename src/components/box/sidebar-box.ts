import { DraggableElement } from '../../dnd'
import style from './style.module.css'

export class SidebarBox extends DraggableElement {
  constructor() {
    super()

    this.classList.add(style.sidebar)
    this.innerText = 'Box'
  }
}

customElements.define('pxl-sidebar-box', SidebarBox)
