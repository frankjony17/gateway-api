import {
  always,
  compose,
  concat,
  cond,
  contains,
  filter,
  includes,
  isEmpty,
  isNil,
  map,
  mergeRight,
  not,
  pipe,
  T,
  toPairs,
  zipObj,
  toUpper,
} from 'ramda';

const statusCodeForbidden = 403;

const forbiddenWithBody = res => body =>
  res.status(statusCodeForbidden).send(body);

const createStaticChallenge = challenge => ({
  preference: `static:${challenge}`,
});

const defineStaticChallenge = cond([
  [isNil, always({})],
  [T, createStaticChallenge],
]);

export const require2fa = ({ res, scope, challenge }) =>
  compose(
    forbiddenWithBody(res),
    mergeRight({
      error: '2fa-required',
      right: `{"${res.req.params.accountId}":["${scope}"]}`,
    }),
    defineStaticChallenge,
  )(challenge);

const testContext = accountIdList => right =>
  contains(right.context, accountIdList);

const publicContext = ['*'];

const makeAccountIdList = ({ accountId = [], foreingAccountId = [] }) =>
  compose(concat(foreingAccountId), concat(publicContext))([accountId]);

const checkContext = ({ accountIdList, rights = [] }) =>
  filter(testContext(accountIdList), rights);

const minimalPattern = rights =>
  pipe(toPairs, map(zipObj(['context', 'scopes'])))(JSON.parse(rights));

const prepareElements = ({ rights, accountId }) => ({
  accountIdList: makeAccountIdList({ accountId }),
  rights: minimalPattern(rights),
});

const selectContext = compose(checkContext, prepareElements);

const testScope = controller => right => includes(controller, right.scopes);

const check2fa = ({ contextMatch, controllerScope }) =>
  compose(
    not,
    isEmpty,
    filter(testScope(`${controllerScope}.2FA`)),
  )(contextMatch);

const checkScope = ({ contextMatch, controllerScope }) =>
  compose(not, isEmpty, filter(testScope(`${controllerScope}`)))(contextMatch);

const checkRight = ({ contextMatch, scopes }) => ({
  authorized: checkScope({ contextMatch, controllerScope: scopes }),
  with2fa: check2fa({ contextMatch, controllerScope: scopes }),
});

export const authorizationFlow = ({ rights = '{}', accountId, scopes }) =>
  checkRight({
    contextMatch: selectContext({
      rights,
      accountId: toUpper(accountId),
    }),
    scopes,
  });

export const verifyBearer = authorization => /Bearer /i.test(authorization);

export const forbidded = res => res.status(statusCodeForbidden).send();
