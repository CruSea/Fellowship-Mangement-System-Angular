import { PostGraduatesGroupsModule } from './post-graduates-groups.module';

describe('PostGraduatesGroupsModule', () => {
  let postGraduatesGroupsModule: PostGraduatesGroupsModule;

  beforeEach(() => {
    postGraduatesGroupsModule = new PostGraduatesGroupsModule();
  });

  it('should create an instance', () => {
    expect(postGraduatesGroupsModule).toBeTruthy();
  });
});
