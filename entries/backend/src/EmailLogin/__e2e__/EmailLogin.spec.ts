import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@fuks-ru/common';

import { AppBuilder } from 'backend/__e2e__/dsl/TestAppModuleCreator';
import { IMockedUser } from 'backend/__e2e__/dsl/UsersBuilder';
import { Role } from 'backend/User/entities/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

const existUser: IMockedUser = {
  email: 'test@test.com',
  password: '1234567890',
  role: Role.USER,
};

describe('EmailLogin', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppBuilder.app().withUser(existUser).please();
  });

  describe('When a user send an invalid email and password', () => {
    it('should return a validate error if empty body', async () => {
      const body = {};

      const response = await request(app.getHttpServer())
        .post('/api/login/basic')
        .send(body);

      expect(response.body).toEqual({
        code: CommonErrorCode.VALIDATION,
        message: expect.any(String),
        data: {
          email: expect.any(Array),
          password: expect.any(Array),
        },
      });
      expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return a unauthorized error if email and password valid', async () => {
      const body = {
        email: 'incorrect@test.com',
        password: 'incorrect',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login/basic')
        .send(body);

      expect(response.body).toEqual({
        code: ErrorCode.USER_INCORRECT_EMAIL_OR_PASSWORD,
        message: expect.any(String),
      });
      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('When a user send valid email and password', () => {
    it('should return ok and set cookie token', async () => {
      const body = {
        email: existUser.email,
        password: existUser.password,
        redirectFrom: 'https://test.com',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login/basic')
        .send(body);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });
});
