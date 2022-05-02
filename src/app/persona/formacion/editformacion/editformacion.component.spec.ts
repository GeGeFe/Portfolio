import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformacionComponent } from './editformacion.component';

describe('EditformacionComponent', () => {
  let component: EditformacionComponent;
  let fixture: ComponentFixture<EditformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
