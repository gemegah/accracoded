interface NetworkInformation {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g' | string;
}

interface Navigator {
  connection?: NetworkInformation;
}

interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

type IdleRequestCallback = (deadline: IdleDeadline) => void;

interface IdleRequestOptions {
  timeout?: number;
}

interface Window {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
}
