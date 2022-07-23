import { compose, last, mergeRight, not, pick, split, and } from 'ramda';
import { decode } from './jwtDecode';
import {
  verifyBearer,
  authorizationFlow,
  forbidded,
  require2fa,
} from './authorization';

const statusCodeUnauthorized = 401;

const separateElementsOfRights = ({
  params: { accountId = '' } = {},
  headers: { authorization = '' } = {},
}) =>
  compose(
    mergeRight({ accountId }),
    pick(['rights']),
    decode,
    last,
    split(' '),
  )(authorization);

const is2fa = ({ with2fa, authorized, res, scopes, challenge }) =>
  and(with2fa, not(authorized))
    ? require2fa({ res, scope: scopes, challenge })
    : false;

const isForbidden = ({ authorized, res }) =>
  not(authorized) ? forbidded(res) : false;

const isAuthorized = ({ condition2fa, conditionForbbiden, next }) =>
  and(not(condition2fa), not(conditionForbbiden)) ? next() : false;

const defineDirection = ({ res, scopes, next, challenge }) => ({
  with2fa,
  authorized,
}) =>
  isAuthorized({
    condition2fa: is2fa({
      with2fa,
      authorized,
      res,
      scopes,
      challenge,
    }),
    conditionForbbiden: isForbidden({ authorized, res }),
    next,
  });

export const hasAuthorization = (scopes, challenge) => (req, res, next) =>
  compose(
    defineDirection({
      res,
      scopes,
      next,
      challenge,
    }),
    authorizationFlow,
    mergeRight({ scopes }),
    separateElementsOfRights,
  )(req);

export const auth = (req, res, next) =>
  verifyBearer(req.headers.authorization)
    ? next()
    : res.status(statusCodeUnauthorized).send();
