import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPaginatorComponent } from './room-paginator.component';

describe('RoomPaginatorComponent', () => {
  let component: RoomPaginatorComponent;
  let fixture: ComponentFixture<RoomPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
