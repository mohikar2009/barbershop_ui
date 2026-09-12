import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaberService } from './baber-service';

describe('BaberService', () => {
  let component: BaberService;
  let fixture: ComponentFixture<BaberService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaberService],
    }).compileComponents();

    fixture = TestBed.createComponent(BaberService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
