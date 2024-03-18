import { DragAttributes, DragEventType, EventListeners } from './types'

type Constructor<T = {}> = new (...args: any[]) => T

export function DraggableMixin<C extends Constructor<HTMLElement>>(Base: C) {
  return class extends Base {
    public dragListeners: Array<EventListeners>

    constructor(...args: any[]) {
      super(...args)

      this.setAttribute(DragAttributes.Draggable, 'true')

      this.dragListeners = [
        {
          eventType: DragEventType.DragStart,
          callback: (event) => {
            event.stopPropagation()
            this.setAttribute(DragAttributes.Dragging, 'true')
          }
        },
        {
          eventType: DragEventType.DragEnd,
          callback: (event) => {
            event.stopPropagation()
            this.setAttribute(DragAttributes.Dragging, 'false')
          }
        }
      ]
    }

    connectedCallback(): void {
      super.connectedCallback?.()

      for (const listener of this.dragListeners) {
        this.addEventListener(listener.eventType, listener.callback)
      }
    }

    disconnectedCallback(): void {
      super.disconnectedCallback?.()

      for (const listener of this.dragListeners) {
        this.removeEventListener(listener.eventType, listener.callback)
      }
    }
  }
}

export class DraggableElement extends DraggableMixin(HTMLElement) {}

customElements.define('pxl-drag-element', DraggableElement)
