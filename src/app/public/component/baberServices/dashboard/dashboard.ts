import { Component , ElementRef, HostListener, ViewChild} from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
    @ViewChild('scroll') scroll!: ElementRef;
  img: boolean = true;
  isScroll: boolean = false;
  star = Array(5);
  @HostListener('window:scroll')
  onScroll() {
    this.isScroll = window.scrollY > 50;
  }
  scrollRight() {
    this.scroll.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }
  scrollLeft() {
    this.scroll.nativeElement.scrollBy({
      left:-300,
      behavior: 'smooth'
    })
  }
}
