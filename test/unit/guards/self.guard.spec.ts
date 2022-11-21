import { ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

import { AppResponse } from '@core/response/classes';
import { Request } from '@core/request';

import { SelfGuard } from '@guards/index';

import { UserService } from '@modules/user';

describe('SelfGuard', () => {
  const user = {
    UUID: '900ff3d3-95fa-45e3-bc54-e7822d7924e3',
    VKID: 88003555,
    isAuth: false
  } as User;

  const getMockRequest = (user, paramName, paramValue) => {
    return {
      user,
      params: {
        [paramName]: paramValue
      }
    } as Request;
  }
  const getMockContext = request => {
    return {
      switchToHttp: () => ({ getRequest: () => request })
    } as ExecutionContext;
  }
  const getErrorResponse = errors => {
    return {
      data: null,
      meta: null,
      status: false,
      error: errors
    } as AppResponse;
  }
  const getDefaultMocks = (user, paramName, paramValue): [any, ExecutionContext, UserService] => {
    const userServiceMock = new UserService(null);
    const requestMock = getMockRequest(user, paramName, paramValue);
    const SelfGuardMixin = SelfGuard(paramName);
    const contextMock = getMockContext(requestMock)
    const selfGuard = new SelfGuardMixin(userServiceMock);

    return [selfGuard, contextMock, userServiceMock];
  }



  describe('canActivate', () => {
    it('should return true if user UUID in token and path are equal', async () => {
      const paramName = 'testParamName';
      const [selfGuard, contextMock, userServiceMock] = getDefaultMocks(user, paramName, user.UUID);
      jest.spyOn(userServiceMock, 'getUserByUUID').mockImplementation(async () => ({ ...user }));

      const result = await selfGuard.canActivate(contextMock);
      expect(result).toBe(true);
    });

    it('should return true if user VKID in token and path are equal', async () => {
      const paramName = 'testParamName';
      const [selfGuard, contextMock, userServiceMock] = getDefaultMocks(null, paramName, user.VKID);
      jest.spyOn(userServiceMock, 'getUserByVKID').mockImplementation(async () => ({ ...user }));

      const result = await selfGuard.canActivate(contextMock);
      expect(result).toBe(true);
    });

    it('should throw specify error if user UUID in token and path are not equal', async () => {
      const paramName = 'testParamName';
      const [selfGuard, contextMock, userServiceMock] = getDefaultMocks(null, paramName, 'c4fe8e72-e5fb-4178-aae5-5a5a24968914');
      jest.spyOn(userServiceMock, 'getUserByUUID').mockImplementation(async () => ({ ...user }));

      let error = null;
      try {
        await selfGuard.canActivate(contextMock);
      } catch (e) {
        error = e;
      }
      expect(error.response).toEqual(getErrorResponse(['User does not have access']));
    });

    it('should throw specify error if user VKID in token and path are not equal', async () => {
      const paramName = 'testParamName';
      const [selfGuard, contextMock, userServiceMock] = getDefaultMocks(null, paramName, 7);
      jest.spyOn(userServiceMock, 'getUserByVKID').mockImplementation(async () => ({ ...user }));

      let error = null;
      try {
        await selfGuard.canActivate(contextMock);
      } catch (e) {
        error = e;
      }
      expect(error.response).toEqual(getErrorResponse(['User does not have access']));
    });

    it('should throw specify error if user VKID or UUID are invalid', async () => {
      const paramName = 'testParamName';
      const [selfGuard, contextMock, userServiceMock] = getDefaultMocks(user, paramName, null);
      jest.spyOn(userServiceMock, 'getUserByVKID').mockImplementation(async () => ({ ...user }));

      let error = null;
      try {
        await selfGuard.canActivate(contextMock);
      } catch (e) {
        error = e;
      }

      expect(error.response).toEqual(getErrorResponse(['Invalid user UUID or VKID param']));
    });

    it('should execute UserService.getUserByVKID if VKID is passed', async () => {
      const paramName = 'testParamName';
      const [selfGuard, contextMock, userServiceMock] = getDefaultMocks(null, paramName, user.VKID);
      const getUserByVKIDMock = jest.spyOn(userServiceMock, 'getUserByVKID').mockImplementation(async () => ({ ...user }));

      await selfGuard.canActivate(contextMock);
      expect(getUserByVKIDMock).toBeCalledWith(user.VKID);
    });
  });
});
