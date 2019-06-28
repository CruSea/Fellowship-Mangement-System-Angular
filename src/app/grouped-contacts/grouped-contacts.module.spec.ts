import { GroupedContactsModule } from './grouped-contacts.module';

describe('GroupedContactsModule', () => {
  let groupedContactsModule: GroupedContactsModule;

  beforeEach(() => {
    groupedContactsModule = new GroupedContactsModule();
  });

  it('should create an instance', () => {
    expect(groupedContactsModule).toBeTruthy();
  });
});
