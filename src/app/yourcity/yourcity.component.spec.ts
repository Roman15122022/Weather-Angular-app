import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourcityComponent } from './yourcity.component';

describe('YourcityComponent', () => {
  let component: YourcityComponent;
  let fixture: ComponentFixture<YourcityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourcityComponent]
    });
    fixture = TestBed.createComponent(YourcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
