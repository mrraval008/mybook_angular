import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonaryComponent } from './masonary.component';

describe('MasonaryComponent', () => {
  let component: MasonaryComponent;
  let fixture: ComponentFixture<MasonaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
