import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'hien-ho',
  standalone: true,
  imports: [],
  templateUrl: './hien-ho.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HienHo {
  count = input(0);
  setCount = output<void>();
}
