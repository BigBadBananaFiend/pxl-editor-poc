import { DraggableElement } from './draggable'
import style from './style.module.css'
import { DragAttributes, DragEventType, EventListeners } from './types'

export class DroppableElement extends HTMLElement {
  public dropListeners: Array<EventListeners>

  protected closestElement: Element | undefined = undefined

  static observedAttributes: string[] = [DragAttributes.DragOver]

  constructor(dropCallback: (event: DragEvent) => Element | void) {
    super()

    this.dropListeners = [
      {
        eventType: DragEventType.DragOver,
        callback: (event) => {
          event.stopPropagation()
          event.preventDefault()

          this.clearPrevClosest()
          this.closestElement = this.getClosestElement(
            event.clientX,
            event.clientY,
            (this.closestElement as DraggableElement).orientation
          )

          this.closestElement?.setAttribute(DragAttributes.IsClosest, 'true')

          this.setIsOver(true)
        }
      },
      {
        eventType: DragEventType.Drop,
        callback: (event) => {
          const child = dropCallback(event)

          if (child) {
            if (this.closestElement) {
              this.insertBefore(child, this.closestElement)
            } else {
              this.appendChild(child)
            }
          }

          this.clearPrevClosest()
          this.setIsOver(false)
        }
      },
      {
        eventType: DragEventType.DragLeave,
        callback: (event) => {
          this.setIsOver(false)
          this.clearPrevClosest()
        }
      }
    ]
  }

  protected setIsOver(value: boolean) {
    if (value) {
      this.setAttribute(DragAttributes.DragOver, 'true')
      return
    }

    this.removeAttribute(DragAttributes.DragOver)
  }

  private clearPrevClosest() {
    return document.querySelector(`[${DragAttributes.IsClosest}="true"`)?.removeAttribute(DragAttributes.IsClosest)
  }

  private getClosestElement(x: number, y: number, orientation: 'vertical' | 'horizontal') {
    const elements = [...this.querySelectorAll(`[${DragAttributes.Draggable}="true"]`)]

    return elements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        let offset = 0

        if (orientation === 'vertical') {
          offset = y - box.top - box.height / 2
        } else {
          offset = x - box.left - box.width / 2
        }

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child }
        }

        return closest
      },
      { offset: Number.NEGATIVE_INFINITY, element: undefined } as { offset: number; element: Element | undefined }
    ).element
  }

  connectedCallback(): void {
    for (const listener of this.dropListeners) {
      this.addEventListener(listener.eventType, listener.callback)
    }
  }

  disconnectedCallback(): void {
    for (const listener of this.dropListeners) {
      this.removeEventListener(listener.eventType, listener.callback)
    }
  }

  attributeChangedCallback(attributeName: string, oldValue: string, newValue: string): void {
    if (attributeName === DragAttributes.DragOver) {
      if (!newValue) {
        this.classList.remove(style.over)
      } else {
        this.classList.add(style.over)
      }
    }
  }
}

customElements.define('pxl-drop-element', DroppableElement)
