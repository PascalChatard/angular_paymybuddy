import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';

import { LogoffComponent } from './logoff.component';

describe('LogoffComponent', () => {
  let component: LogoffComponent;
  let fixture: ComponentFixture<LogoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoffComponent ],
      providers:[AuthService],
      imports:[HttpClientModule, AppRoutingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
