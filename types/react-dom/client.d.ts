declare module 'react-dom/client' {
  import { ReactElement } from 'react';
  import { Renderer, Root } from 'react-dom';

  export function createRoot(
    container: Element | DocumentFragment,
    options?: { hydrate?: boolean },
  ): Root;
  export function hydrateRoot(
    container: Element | DocumentFragment,
    children: ReactElement,
    options?: { hydrate?: boolean },
  ): Root;

  export interface Root {
    render(children: ReactElement): void;
    unmount(): void;
  }
}
