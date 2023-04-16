import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
 	
import {} from 'jasmine';


describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent]
    }).compileComponents();
  });


  it('should create the app', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'PayMyBuddy'`, () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PayMyBuddy');
  });


  it('should render welcom message', () => {

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(' Welcome to PayMyBuddy!!! ');

  });


  it('should fetch authentication service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // const authService = TestBed.inject(AuthService);  //!!!!!******** Fonctionne aussi: service au niveau root ******!!!!
    const authService = fixture.debugElement.injector.get(AuthService);  //!!!!!******** Fonctionne aussi: service au niveau module ou composant ******!!!!
    expect(authService).toBeTruthy();
  });


  describe('#isUserLogged', () => {

    let mockedAuthService: any;// = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    beforeEach(async () => {

      mockedAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

      await TestBed.configureTestingModule({
        providers: [{provide: AuthService, useValue: mockedAuthService}],
        declarations: [AppComponent]
      }).compileComponents();
    });


    afterEach(() => {
      mockedAuthService = null;
      
    });


    it('isUserLogged should be false', () => {

      mockedAuthService.isAuthenticated.and.returnValue(false);

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      expect(app.isUserLogged).toBeTruthy();
      expect(app.isUserLogged()).toBeFalse();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalledTimes(1);
    });


    it('isUserLogged should be true', () => {

      mockedAuthService.isAuthenticated.and.returnValue(true);

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      
      expect(app.isUserLogged).toBeTruthy();
      expect(app.isUserLogged()).toBeTrue();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalledTimes(1);
    });
  })


  describe('#getAccountId', () => {

    let mockedAuthService: any;

    beforeEach(() => {
      mockedAuthService = jasmine.createSpyObj('AuthService', ['isAuthenticated','getAccountIdOfAuthenticatedUser']);
      TestBed.configureTestingModule({
        providers: [{provide: AuthService, useValue: mockedAuthService}],
        declarations: [AppComponent]
      }).compileComponents();
    });


    afterEach(() => {
      mockedAuthService = null;
      
    });


    it('getAccountId should return a valid ID', () => {

      mockedAuthService.isAuthenticated.and.returnValue(true);
      mockedAuthService.getAccountIdOfAuthenticatedUser.and.returnValue(10);

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      expect(app.getAccountId).toBeTruthy();
      expect(app.getAccountId()).toEqual(10);
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalledTimes(1);
      expect(mockedAuthService.getAccountIdOfAuthenticatedUser).toHaveBeenCalled();
      expect(mockedAuthService.getAccountIdOfAuthenticatedUser).toHaveBeenCalledTimes(1);

    });


    it('getAccountId should return null value if authenticate false', () => {

      mockedAuthService.isAuthenticated.and.returnValue(false);

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      expect(app.getAccountId).toBeTruthy();
      expect(app.getAccountId()).toBeNull();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      expect(mockedAuthService.isAuthenticated).toHaveBeenCalledTimes(1);  
      expect(mockedAuthService.getAccountIdOfAuthenticatedUser).toHaveBeenCalledTimes(0);

    });

  })

});

