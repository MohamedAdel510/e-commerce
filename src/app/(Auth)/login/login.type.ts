import * as zod from 'zod';
import { schema } from './login.schema';

export type LoginType =  zod.infer<typeof schema>