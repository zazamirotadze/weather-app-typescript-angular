import { Directive, output, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutside {
  clickOutside = output<void>();
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private listener: (() => void) | null = null;

  constructor() {
    this.listener = this.renderer.listen('document', 'click', (event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.clickOutside.emit();
      }
    });
  }

  ngOnDestroy() {
    if (this.listener) {
      this.listener();
    }
  }
}
