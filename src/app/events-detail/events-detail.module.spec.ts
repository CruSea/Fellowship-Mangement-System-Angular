import { EventsDetailModule } from './events-detail.module';

describe('EventsDetailModule', () => {
  let eventsDetailModule: EventsDetailModule;

  beforeEach(() => {
    eventsDetailModule = new EventsDetailModule();
  });

  it('should create an instance', () => {
    expect(eventsDetailModule).toBeTruthy();
  });
});
