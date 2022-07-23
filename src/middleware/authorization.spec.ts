import { authorizationFlow } from './authorization';

const rightsTests = [
  {
    resourceScope: 'ACCOUNT.POST',
    accountIdUri: '456',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST.2FA',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
    },
    expected: { authorized: false, with2fa: false },
  },
  {
    resourceScope: 'ACCOUNT.POST',
    accountIdUri: '123',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST.2FA',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
    },
    expected: { authorized: false, with2fa: true },
  },
  {
    resourceScope: 'ACCOUNT.POST',
    accountIdUri: '123',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
    },
    expected: { authorized: true, with2fa: false },
  },
  {
    resourceScope: 'CARD.GET',
    accountIdUri: '123',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST.2FA',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
    },
    expected: { authorized: false, with2fa: false },
  },
  {
    resourceScope: 'ACCOUNT.GET',
    accountIdUri: '456',
    rights: [],
    expected: { authorized: false, with2fa: false },
  },
  {
    resourceScope: 'CARD.GET',
    accountIdUri: '456',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST.2FA',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
      '*': ['CARD.GET', 'CARD.POST.2FA', 'CARD.PUT.2FA', 'CARD.PATCH'],
    },
    expected: { authorized: true, with2fa: false },
  },
  {
    resourceScope: 'CARD.POST',
    accountIdUri: '456',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST.2FA',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
      '*': ['CARD.GET', 'CARD.POST.2FA', 'CARD.PUT.2FA', 'CARD.PATCH'],
    },
    expected: { authorized: false, with2fa: true },
  },
  {
    resourceScope: 'PAYMENT.GET',
    accountIdUri: '456',
    rights: {
      '123': [
        'ACCOUNT.GET',
        'ACCOUNT.POST.2FA',
        'ACCOUNT.PUT.2FA',
        'ACCOUNT.PATCH',
      ],
      '*': ['CARD.GET', 'CARD.POST.2FA', 'CARD.PUT.2FA', 'CARD.PATCH'],
    },
    expected: { authorized: false, with2fa: false },
  },
];

describe('Unit test of authorization middleware', () => {
  describe('Test a authorizationFlow function', () => {
    it('authorizationFlow - should return object with two boolean that indicate the way to follow', () => {
      rightsTests.forEach(right => {
        const result = authorizationFlow({
          scopes: right.resourceScope,
          accountId: right.accountIdUri,
          rights: JSON.stringify(right.rights),
        });
        expect(result).toStrictEqual(right.expected);
      });
    });
  });
});
