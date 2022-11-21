import { FastifyRequest } from 'fastify';
import { User } from '@prisma/client';

export interface Request extends FastifyRequest {
  user?: User;
}
