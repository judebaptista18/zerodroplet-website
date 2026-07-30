import '@testing-library/jest-dom';

class MessageChannelMock {
  port1 = {
    onmessage: null as (() => void) | null,
  };

  port2 = {
    postMessage: () => {
      setTimeout(() => this.port1.onmessage?.(), 0);
    },
  };
}

Object.defineProperty(globalThis, 'MessageChannel', {
  writable: true,
  value: MessageChannelMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
});
