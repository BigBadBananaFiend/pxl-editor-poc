export enum DragAttributes {
  Draggable = 'draggable',
  Dragging = 'dragging',
  DragOver = 'over',
  IsClosest = 'isclosest'
}

export enum DragEventType {
  DragStart = 'dragstart',
  DragEnd = 'dragend',
  DragEnter = 'dragenter',
  DragLeave = 'dragleave',
  DragOver = 'dragover',
  Drop = 'drop'
}

export type EventListeners = {
  eventType: DragEventType
  callback: (event: DragEvent) => void
}
