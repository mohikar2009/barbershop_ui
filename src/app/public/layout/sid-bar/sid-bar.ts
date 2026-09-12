import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sid-bar',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './sid-bar.html',
  styleUrl: './sid-bar.css',
})
export class SidBar implements OnInit {
  active!:string;
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
   this.route.url.subscribe({
    next:(res)=>{
      this.active=res[0].path
      console.log(this.active)
    }
   })
  }
}
