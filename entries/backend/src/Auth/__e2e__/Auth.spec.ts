import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@fuks-ru/common-backend';

import { AppBuilder } from 'backend/__e2e__/dsl/TestAppModuleCreator';
import { IMockedUser } from 'backend/__e2e__/dsl/UsersBuilder';
import { Role } from 'backend/User/entities/User';

const existUser: IMockedUser = {
  email: 'test@test.com',
  password: '1234567890',
  role: Role.USER,
};

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppBuilder.app().withUser(existUser).please();
  });

  describe('When user logged in', () => {
    it('should return user', async () => {
      const body = {
        email: existUser.email,
        password: existUser.password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/api/login/email')
        .send(body);

      const response = await request(app.getHttpServer())
        .get('/api/auth/verify')
        .set('Cookie', loginResponse.headers['set-cookie'] as string[]);

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          email: existUser.email,
          role: existUser.role,
        }),
      );
    });
  });

  describe('When user not logged in', () => {
    it('should return unauthorized error', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/auth/verify',
      );

      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
      expect(response.body).toEqual({
        code: CommonErrorCode.UNAUTHORIZED,
        message: expect.any(String),
      });
    });
  });
});
