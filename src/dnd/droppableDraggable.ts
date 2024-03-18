import { DraggableMixin } from './draggable'
import { DroppableElement } from './droppable'

export class DragDropElement extends DraggableMixin(DroppableElement) {
  constructor(dropCallback: (event: DragEvent) => void) {
    super(dropCallback)
  }
}

customElements.define('pxl-drap-drop', DragDropElement)
