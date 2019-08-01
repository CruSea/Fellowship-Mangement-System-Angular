import { PostGraduatesGroupsDetailModule } from './post-graduates-groups-detail.module';

describe('PostGraduatesGroupsDetailModule', () => {
  let postGraduatesGroupsDetailModule: PostGraduatesGroupsDetailModule;

  beforeEach(() => {
    postGraduatesGroupsDetailModule = new PostGraduatesGroupsDetailModule();
  });

  it('should create an instance', () => {
    expect(postGraduatesGroupsDetailModule).toBeTruthy();
  });
});
