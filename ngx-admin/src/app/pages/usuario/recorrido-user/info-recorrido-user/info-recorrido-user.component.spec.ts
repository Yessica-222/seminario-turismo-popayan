import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecorridoUserComponent } from './info-recorrido-user.component';

describe('InfoRecorridoUserComponent', () => {
  let component: InfoRecorridoUserComponent;
  let fixture: ComponentFixture<InfoRecorridoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRecorridoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRecorridoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
