import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { GitUsers, Users } from "../../../test-server/test.data";
import { environment } from "../../environments/environment";

describe('Testing DataService', () => {
  let dataService: ProfileService,
  httpTestingController: HttpTestingController;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    }).compileComponents();
    dataService = TestBed.inject(ProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch user `mojombo` for id=1', () => {
    dataService.getGitUsersProfile(0, 5).subscribe(
      data => {
        expect(data[0].login).toBe('mojombo');
      });

    const req = httpTestingController.expectOne('https://api.github.com/users?since=0&per_page=5');
    expect(req.request.method).toEqual('GET');
    req.flush({ "payload":Object.values(GitUsers)})
  });

  it('should fetch user avatar_url `https://avatars.githubusercontent.com/u/2?v=4` for id=1', () => {
    dataService.getGitUsersProfile(0, 5).subscribe(
      data => {
        expect(data).toBeTruthy();
        expect(data[0].avatar_url).toBe('https://avatars.githubusercontent.com/u/2?v=4');
      });

    const req = httpTestingController.expectOne('https://api.github.com/users?since=0&per_page=5');
    expect(req.request.method).toEqual('GET');
    req.flush({ "payload":Object.values(GitUsers)})
  });

  it('should fetch user url `https://api.github.com/users/mojombo` for id=1', () => {
    dataService.getGitUsersProfile(0, 5).subscribe(
      data => {
        console.log(data);
        expect(data[0].id).toBe(1);
        expect(data[0].avatar_url).toBe(environment.baseUrl+'/mojombo');
      });

    const req = httpTestingController.expectOne('https://api.github.com/users?since=0&per_page=5');
    expect(req.request.method).toEqual('GET');
    req.flush({ "payload":Object.values(Users)})
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
