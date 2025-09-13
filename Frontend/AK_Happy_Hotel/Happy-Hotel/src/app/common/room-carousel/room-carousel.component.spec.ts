import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCarouselComponent } from './room-carousel.component';

describe('RoomCarouselComponent', () => {
  let component: RoomCarouselComponent;
  let fixture: ComponentFixture<RoomCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
