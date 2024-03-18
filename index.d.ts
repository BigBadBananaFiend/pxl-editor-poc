declare module '*.module.css'

interface HTMLElement {
  attributeChangedCallback(attributeName: string, oldValue: string, newValue: string): void
  connectedCallback(): void
  disconnectedCallback(): void
  observedAttributes: string[]
}
