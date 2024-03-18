import { DragAttributes, DragEventType, EventListeners } from './types'
import style from './style.module.css'

type Constructor<T = {}> = new (...args: any[]) => T

export function DraggableMixin<C extends Constructor<HTMLElement>>(Base: C) {
  return class extends Base {
    public dragListeners: Array<EventListeners>

    public orientation: 'vertical' | 'horizontal' = 'vertical'

    static observedAttributes: string[] = [DragAttributes.IsClosest]

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

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string): void {
      super.attributeChangedCallback?.(attributeName, oldValue, newValue)

      if (attributeName === DragAttributes.IsClosest) {
        if (!newValue) {
          this.classList.remove(this.orientation === 'vertical' ? style.closest : style['closest-h'])
        } else {
          console.log(this.orientation, 'DEBUG')
          this.classList.add(this.orientation === 'vertical' ? style.closest : style['closest-h'])
        }
      }
    }
  }
}

export class DraggableElement extends DraggableMixin(HTMLElement) {}

customElements.define('pxl-drag-element', DraggableElement)
