import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsiteComponent } from './layoutsite.component';

describe('LayoutsiteComponent', () => {
  let component: LayoutsiteComponent;
  let fixture: ComponentFixture<LayoutsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsiteComponent]
    });
    fixture = TestBed.createComponent(LayoutsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
