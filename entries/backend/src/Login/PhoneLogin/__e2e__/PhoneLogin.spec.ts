import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CommonErrorCode } from '@fuks-ru/common';

import { AppBuilder } from 'backend/__e2e__/dsl/TestAppModuleCreator';
import { IMockedUser } from 'backend/__e2e__/dsl/UsersBuilder';
import { Role } from 'backend/User/entities/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

const existUser: IMockedUser = {
  phone: '79999999999',
  password: '1234567890',
  role: Role.USER,
};

describe('PhoneLogin', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppBuilder.app().withUser(existUser).please();
  });

  describe('When a user send an invalid phone and password', () => {
    it('should return a validate error if empty body', async () => {
      const body = {};

      const response = await request(app.getHttpServer())
        .post('/api/login/phone')
        .send(body);

      expect(response.body).toEqual({
        code: CommonErrorCode.VALIDATION,
        message: expect.any(String),
        data: {
          phone: expect.any(Array),
          password: expect.any(Array),
        },
      });
      expect(response.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return a unauthorized error if phone and password valid', async () => {
      const body = {
        phone: '79888888888',
        password: 'incorrect',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login/phone')
        .send(body);

      expect(response.body).toEqual({
        code: ErrorCode.USER_INCORRECT_PHONE_OR_PASSWORD,
        message: expect.any(String),
      });
      expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('When a user send valid phone and password', () => {
    it('should return ok and set cookie token', async () => {
      const body = {
        phone: existUser.phone,
        password: existUser.password,
        redirectFrom: 'https://test.com',
      };

      const response = await request(app.getHttpServer())
        .post('/api/login/phone')
        .send(body);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('jwtToken')]),
      );
    });
  });
});
