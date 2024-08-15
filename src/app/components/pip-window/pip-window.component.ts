import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pip-window',
  standalone: true,
  imports: [],
  templateUrl: './pip-window.component.html',
  styleUrl: './pip-window.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipWindowComponent {

}
