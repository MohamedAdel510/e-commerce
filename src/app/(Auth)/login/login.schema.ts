import * as zod from 'zod'

   //  "email":"ahmedmutti@gmail.com",
   //  "password":"Ahmed@123"

export const schema = zod.object({
    email: zod.email('invled email!'),
    password: zod.string('password is required').nonempty('password is required')
});