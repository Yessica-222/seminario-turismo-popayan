import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoUserComponent } from './recorrido-user.component';

describe('RecorridoUserComponent', () => {
  let component: RecorridoUserComponent;
  let fixture: ComponentFixture<RecorridoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorridoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorridoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


