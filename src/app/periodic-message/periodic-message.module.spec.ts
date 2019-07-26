import { PeriodicMessageModule } from './periodic-message.module';

describe('PeriodicMessageModule', () => {
  let periodicMessageModule: PeriodicMessageModule;

  beforeEach(() => {
    periodicMessageModule = new PeriodicMessageModule();
  });

  it('should create an instance', () => {
    expect(periodicMessageModule).toBeTruthy();
  });
});
