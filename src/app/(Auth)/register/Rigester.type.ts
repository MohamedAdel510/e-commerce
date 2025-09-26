import { schema } from "./Rigester.schema";
import * as zod from 'zod'

export type RegisterType = zod.infer<typeof schema>