import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowServices } from './brow-services';

describe('BrowServices', () => {
  let component: BrowServices;
  let fixture: ComponentFixture<BrowServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowServices],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
