import { Injectable, ComponentRef, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: ComponentRef<ToastComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  showError(message: string) {
    this.showToast(message, 'error');
  }

  showSuccess(message: string) {
    this.showToast(message, 'success');
  }

  private showToast(message: string, type: 'error' | 'success') {
    const toastComponentRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    toastComponentRef.instance.message = message;
    toastComponentRef.instance.type = type;

    document.body.appendChild(toastComponentRef.location.nativeElement);
    this.appRef.attachView(toastComponentRef.hostView);

    this.toasts.push(toastComponentRef);

    setTimeout(() => {
      const index = this.toasts.indexOf(toastComponentRef);
      if (index > -1) {
        this.toasts.splice(index, 1);
        this.appRef.detachView(toastComponentRef.hostView);
        toastComponentRef.destroy();
      }
    }, 3000);
  }
}