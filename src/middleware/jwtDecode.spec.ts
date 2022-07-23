import jwt_decode from 'jwt-decode';
import { decode } from './jwtDecode';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const tokenDecoded = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
};

describe('Test a decode function', () => {
  it('decode - should decode a object', () => {
    const result = decode(token);
    expect(result).toStrictEqual(tokenDecoded);
  });

  it('decode - should anwser equals jwt npm', () => {
    const result = decode(token);
    const [, hash] = token.split(' ');
    const resultWithJwtModule = jwt_decode(hash);
    expect(result).toStrictEqual(resultWithJwtModule);
  });
  it('decode - should cant decode', () => {
    const notAToken = 'not a token';
    const result = decode(notAToken);
    expect(result).toStrictEqual({});
  });
});
