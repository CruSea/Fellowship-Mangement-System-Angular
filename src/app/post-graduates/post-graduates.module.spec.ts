import { PostGraduatesModule } from './post-graduates.module';

describe('PostGraduatesModule', () => {
  let postGraduatesModule: PostGraduatesModule;

  beforeEach(() => {
    postGraduatesModule = new PostGraduatesModule();
  });

  it('should create an instance', () => {
    expect(postGraduatesModule).toBeTruthy();
  });
});
