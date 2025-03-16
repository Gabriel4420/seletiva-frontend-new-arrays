import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" [class.show]="show" [class.success]="type === 'success'" [class.error]="type === 'error'">
      <div class="toast-content">
        <span class="message">{{ message }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' = 'error';
  show: boolean = false;

  ngOnInit() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}