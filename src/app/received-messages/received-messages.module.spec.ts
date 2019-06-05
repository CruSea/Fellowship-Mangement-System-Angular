import { ReceivedMessagesModule } from './received-messages.module';

describe('ReceivedMessagesModule', () => {
  let receivedMessagesModule: ReceivedMessagesModule;

  beforeEach(() => {
    receivedMessagesModule = new ReceivedMessagesModule();
  });

  it('should create an instance', () => {
    expect(receivedMessagesModule).toBeTruthy();
  });
});
