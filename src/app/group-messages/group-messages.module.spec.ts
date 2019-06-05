import { GroupMessagesModule } from './group-messages.module';

describe('GroupMessagesModule', () => {
  let groupMessagesModule: GroupMessagesModule;

  beforeEach(() => {
    groupMessagesModule = new GroupMessagesModule();
  });

  it('should create an instance', () => {
    expect(groupMessagesModule).toBeTruthy();
  });
});
