import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.
import jwt from 'jsonwebtoken'

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [
      async (context: HookContext) => {
        const userId = context.params.user!._id;
        const projects = await context.app.service('projects').find({
          'participants.userId': userId,
        });

        context.dispatch = {
          user: context.params.user,
          projects: projects
        }
      }
    ],
    create: [
      async (context: HookContext) => {
        const now = Date.now();
        const token = jwt.sign({
          sub: String(context.result._id),
          iat: now,
          exp: now + (24 * 60 * 60 * 1000),
          aud: 'https://blog-wepro.netlify.app',
        }, String(context.app.get('authentication')?.secret));

        context.dispatch = {
          accessToken: token
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
