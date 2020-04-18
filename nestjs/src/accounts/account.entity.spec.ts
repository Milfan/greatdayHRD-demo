import { Accounts } from './account.entity';

describe('AccountEntity', () => {
  it('should be defined', () => {
    expect(new Accounts()).toBeDefined();
  });
});
