import { Injectable } from '@angular/core';
import copyCssToPipWindow from './copy-css-to-pip';
import { useSignal } from '../../extension/use-signal';

/**
 * @see [Document](https://developer.chrome.com/docs/web-platform/document-picture-in-picture)
 */
interface RequestPipWindowOptions {
  width?: number;
  height?: number;
  disallowReturnToOpener?: boolean;
}

declare const documentPictureInPicture: {
  requestWindow: (options?: RequestPipWindowOptions) => Promise<Window>;
};

@Injectable({
  providedIn: 'root',
})
export class PipWindowService {
  isSupported = 'documentPictureInPicture' in window;
  pipWindow = useSignal<Window>();

  async requestPipWindow(
    options: RequestPipWindowOptions,
    beforeClose?: () => void,
  ) {
    if (this.pipWindow()) {
      return;
    }

    const pip = await documentPictureInPicture.requestWindow({
      width: options.width,
      height: options.height,
      disallowReturnToOpener: options.disallowReturnToOpener,
    });

    copyCssToPipWindow(pip);
    this.pipWindow.set(pip);
    pip.addEventListener('pagehide', () => {
      this.pipWindow.set(undefined);
      beforeClose && beforeClose();
    });
  }

  closePipWindow() {
    if (this.pipWindow()) {
      this.pipWindow()!.close();
      this.pipWindow.set(undefined);
    }
  }
}
