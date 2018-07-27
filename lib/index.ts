/* global URL */
import {AUDIO, VIDEO} from './media';

export interface IAutoplayResult {
  result: boolean;
  error?: Error;
}

export interface IAutoplayOptions {
  inline: boolean;
  muted: boolean;
  timeout: number;
}

export interface IElementOptions {
  element: HTMLMediaElement;
  source: string;
}

function setupDefaultValues(options?: any): IAutoplayOptions {
  return {
    inline: false,
    muted: false,
    timeout: 250,
    ...options,
  };
}

function startPlayback({muted, timeout, inline}: IAutoplayOptions, elementCallback: () => IElementOptions): Promise<IAutoplayResult> {
  const {element, source} = elementCallback();

  element.muted = muted;
  if (muted) {
    element.setAttribute('muted', 'muted');
  }
  // indicates that the video is to be played "inline",
  // that is within the element's playback area.
  if (inline) {
    element.setAttribute('playsinline', 'playsinline');
  }

  element.src = source;

  return new Promise((resolve: (results: IAutoplayResult) => void) => {
    const playResult = element.play();
    const timeoutId = setTimeout(() => {
      sendOutput(false, new Error(`Timeout ${timeout} ms has been reached`));
    }, timeout);
    const sendOutput = (result: boolean, error?: Error) => {
      clearTimeout(timeoutId);
      resolve({result, error});
    };
    if (playResult !== undefined) {
      playResult
        .then(() => sendOutput(true))
        .catch((playError: Error) => sendOutput(false, playError));
    } else {
      sendOutput(true);
    }
  });
}

//
// API
//

function video(options?: IAutoplayOptions) {
  return startPlayback(setupDefaultValues(options), (): IElementOptions => {
    return {
      element: document.createElement('video'),
      source: URL.createObjectURL(VIDEO),
    };
  });
}

function audio(options?: IAutoplayOptions) {
  return startPlayback(setupDefaultValues(options), (): IElementOptions => {
    return {
      element: document.createElement('audio'),
      source: URL.createObjectURL(AUDIO),
    };
  });
}

export const canAutoplay = { audio, video };
