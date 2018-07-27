interface ICanAutoplayResult {
    result: boolean;
    error?: Error;
}

interface ICanAutoplayOptions {
    inline?: boolean,
    muted?: boolean,
    timeout?: number,
}

declare const canAutoplay: {
  audio: (options?: ICanAutoplayOptions) => Promise<ICanAutoplayResult>;

  video: (options?: ICanAutoplayOptions) => Promise<ICanAutoplayResult>;
};

export = canAutoplay;
