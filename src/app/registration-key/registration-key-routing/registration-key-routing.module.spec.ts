import { RegistrationKeyRoutingModule } from './registration-key-routing.module';

describe('RegistrationKeyRoutingModule', () => {
  let registrationKeyRoutingModule: RegistrationKeyRoutingModule;

  beforeEach(() => {
    registrationKeyRoutingModule = new RegistrationKeyRoutingModule();
  });

  it('should create an instance', () => {
    expect(registrationKeyRoutingModule).toBeTruthy();
  });
});
