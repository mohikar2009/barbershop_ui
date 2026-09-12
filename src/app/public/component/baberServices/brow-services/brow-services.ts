import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SidBar } from '../../../layout/sid-bar/sid-bar';
@Component({
  selector: 'app-brow-services',
  imports: [CommonModule, DecimalPipe,SidBar],
  templateUrl: './brow-services.html',
  styleUrl: './brow-services.css',
})
export class BrowServices {
  services = [
    {
      title: 'اصلاح ابرو',
      image: 'img/servicebaber/ebrow/ebrow_cut.webp',
      duration: '45 دقیقه',
      price: 400000,
      alt: 'اصلاح ابرو',
      flip: false
    },
    {
      title: 'رنگ ابرو',
      image: 'img/servicebaber/ebrow/ebrowColor.webp',
      duration: '2 ساعت',
      price: 2000000,
      alt: 'رنگ ابرو',
      flip: false
    },
    {
      title: 'میکروبیلدینگ',
      image: 'img/servicebaber/ebrow/miro.webp',
      duration: '1 ساعت و 45 دقیقه',
      price: 1500000,
      alt: 'میکروبیلدینگ',
      flip: false
    },
    {
      title: 'لمینت ابرو',
      image: 'img/servicebaber/ebrow/shiftEbrow.webp',
      duration: '50 دقیقه',
      price: 1200000,
      alt: 'لمینت ابرو',
      flip: true
    },
    {
      title: 'لیفت ابرو',
      image: 'img/servicebaber/ebrow/leftEbrow.webp',
      duration: '1 ساعت و 25 دقیقه',
      price: 700000,
      alt: 'لیفت ابرو',
      flip: true
    },
     {
      title: 'پودر ابرو',
      image: 'img/servicebaber/ebrow/img_eb_7.webp',
      duration: '1 ساعت و 50 دقیقه',
      price: 500000,
      alt: 'لیفت ابرو',
      flip: false
    }
  ];
}
