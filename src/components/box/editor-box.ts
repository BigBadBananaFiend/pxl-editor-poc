import { DragDropElement } from '../../dnd/droppableDraggable'
import { DragAttributes } from '../../dnd/types'
import style from './style.module.css'

import { v4 } from 'uuid'

let id = 0

const handleDrop = (event: DragEvent) => {
  event.stopPropagation()

  const dragging = document.querySelector(`[${DragAttributes.Dragging}="true"]`)

  if (dragging && dragging.parentElement && dragging.parentElement.id === 'aside') {
    return new EditorBox()
  }

  return dragging
}

export class EditorBox extends DragDropElement {
  static observedAttributes: string[] = [DragAttributes.DragOver, DragAttributes.IsClosest]

  constructor() {
    super(handleDrop)

    this.classList.add(style.editor, style[`${this.orientation}`])
    this.textContent = `${id++}`
    this.id = `${v4()}`
  }

  connectedCallback(): void {
    super.connectedCallback?.()

    this.addEventListener('click', () => {
      const prev = this.orientation

      if (prev === 'horizontal') {
        this.orientation = 'vertical'
      } else {
        this.orientation = 'horizontal'
      }
      this.classList.replace(style[`${prev}`], style[`${this.orientation}`])
    })
  }
}

customElements.define('pxl-editor-box', EditorBox)
