import { GroupContactsModule } from './group-contacts.module';

describe('GroupContactsModule', () => {
  let groupContactsModule: GroupContactsModule;

  beforeEach(() => {
    groupContactsModule = new GroupContactsModule();
  });

  it('should create an instance', () => {
    expect(groupContactsModule).toBeTruthy();
  });
});
