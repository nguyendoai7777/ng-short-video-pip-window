import { JsonPipe } from '@angular/common';
import {
  ApplicationRef,
  Component,
  ComponentRef,
  createComponent,
  inject,
  OutputRefSubscription,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HienHo } from './components/hien-ho/hien-ho.component';
import { PipWindowService } from './components/pip-window/pip-window.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HienHo, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  countSubs?: OutputRefSubscription;
  pipComponent?: ComponentRef<HienHo>;

  count = signal(0);

  pipCtx = inject(PipWindowService);
  applicationRef = inject(ApplicationRef);

  setCount() {
    this.count.update((pv) => pv + 1);
    // for share count state between native window and pipwindow
    if (this.pipComponent) {
      this.pipComponent.setInput('count', this.count());
    }
  }

  async openPipWindow() {
    await this.pipCtx.requestPipWindow(
      {
        width: 279,
        height: 496,
      },

      this.cleanupComponetWhenClosePip.bind(this),
    );
    this.pipComponent = createComponent(HienHo, {
      environmentInjector: this.applicationRef.injector,
      hostElement: this.pipCtx.pipWindow()!.document.body,
    });

    this.pipComponent.setInput('count', this.count());
    this.applicationRef.attachView(this.pipComponent.hostView);
    this.countSubs = this.pipComponent.instance.setCount.subscribe(() => {
      this.setCount();
      this.pipComponent!.setInput('count', this.count());
    });
  }

  cleanupComponetWhenClosePip() {
    this.countSubs?.unsubscribe();
    this.pipComponent?.destroy();
  }

  closePipWindow() {
    this.pipCtx.closePipWindow();
    this.cleanupComponetWhenClosePip();
  }
}
