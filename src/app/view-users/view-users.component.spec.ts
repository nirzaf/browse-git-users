import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileService } from '../services/profile.service';

import { ViewUsersComponent } from './view-users.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;
  let dataService: ProfileService,
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

    dataService = TestBed.inject(ProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
