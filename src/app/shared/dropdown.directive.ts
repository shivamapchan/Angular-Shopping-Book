import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  //optional if you want to closed by click anywhere
  @HostListener('document: click', ['$event']) toggleOpen(event: Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen: false;
  }

  //If you want to closed by click on the specific dropdwon icon
  // @HostListener('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  // }

  constructor(private elRef: ElementRef) { }

}
