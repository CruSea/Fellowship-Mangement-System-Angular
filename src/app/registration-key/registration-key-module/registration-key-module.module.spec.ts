import { RegistrationKeyModuleModule } from './registration-key-module.module';

describe('RegistrationKeyModuleModule', () => {
  let registrationKeyModuleModule: RegistrationKeyModuleModule;

  beforeEach(() => {
    registrationKeyModuleModule = new RegistrationKeyModuleModule();
  });

  it('should create an instance', () => {
    expect(registrationKeyModuleModule).toBeTruthy();
  });
});
