import { ScheduledMessageModule } from './scheduled-message.module';

describe('ScheduledMessageModule', () => {
  let scheduledMessageModule: ScheduledMessageModule;

  beforeEach(() => {
    scheduledMessageModule = new ScheduledMessageModule();
  });

  it('should create an instance', () => {
    expect(scheduledMessageModule).toBeTruthy();
  });
});
