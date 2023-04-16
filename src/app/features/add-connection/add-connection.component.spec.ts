import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AddConnectionComponent } from './add-connection.component';
import { AuthService } from 'src/app/services/auth.service';


describe('AddConnectionComponent', () => {
  let component: AddConnectionComponent;
  let fixture: ComponentFixture<AddConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService],
      declarations: [ AddConnectionComponent ],
      imports:[HttpClientModule, AppRoutingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

  //   spyOn(component._activatedRoute.paramMap,"get").and.callFake(() => {
  //     return 1;
  // });

  //component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
