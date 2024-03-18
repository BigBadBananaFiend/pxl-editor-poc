import style from './app-init.module.css'
import { EditorBox, SidebarBox } from './components'
import { DroppableElement } from './dnd'
import { DragAttributes } from './dnd/types'

const handleDrop = (event: DragEvent) => {
  event.stopPropagation()
  const dragging = document.querySelector(`[${DragAttributes.Dragging}="true"]`)

  if (dragging) {
    return new EditorBox()
  }
}

class Main extends DroppableElement {
  constructor() {
    super(handleDrop)

    this.id = 'main'
    this.classList.add(style.main)
  }
}

customElements.define('pxl-editor-main', Main, { extends: 'main' })

export const appInit = () => {
  const BODY = document.querySelector('body')

  window.onload = () => {
    const root = document.createElement('div')
    root.classList.add(style.container)
    root.id = 'root'

    const aside = document.createElement('aside')
    aside.classList.add(style.aside)
    aside.id = 'aside'

    aside.appendChild(new SidebarBox())

    root.appendChild(new Main())
    root.appendChild(aside)

    BODY?.appendChild(root)
  }
}
