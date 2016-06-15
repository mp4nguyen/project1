import {Directive, ElementRef, Renderer} from 'angular2/core';

@Directive({
  selector: '[styled]',
})

export class StyledDirective {
  constructor(public el: ElementRef, public renderer: Renderer) {
    // el.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    console.log("running...");
  }
}
