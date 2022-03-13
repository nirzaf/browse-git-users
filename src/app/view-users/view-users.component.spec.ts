import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../services/data.service';

import { ViewUsersComponent } from './view-users.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;
  let dataService: DataService,
    httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ViewUsersComponent ],
      providers: [DataService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
