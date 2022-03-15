import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ProfileService } from '../services/profile.service';
import { ViewUsersComponent } from './view-users.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Observable, Subscription } from 'rxjs';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;
  let profileService: ProfileService,
    httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ViewUsersComponent ],
      providers: [ProfileService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    profileService = TestBed.inject(ProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('interval should be defined', () => {
    expect(component.period).toBeDefined(new Observable<number>(data=>data.next(30000)));
  });

  it('isAutomaticLoadingEnabled should be defined as false', () => {
    expect(component.isAutomaticLoadingEnabled).toEqual(false);
  });

  it('automaticLoader should be defined', () => {
    expect(component.automaticLoader).toBeDefined(new Subscription());
  });
});
