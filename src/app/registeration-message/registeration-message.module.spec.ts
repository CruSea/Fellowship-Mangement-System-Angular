import { RegisterationMessageModule } from './registeration-message.module';

describe('RegisterationMessageModule', () => {
  let registerationMessageModule: RegisterationMessageModule;

  beforeEach(() => {
    registerationMessageModule = new RegisterationMessageModule();
  });

  it('should create an instance', () => {
    expect(registerationMessageModule).toBeTruthy();
  });
});
