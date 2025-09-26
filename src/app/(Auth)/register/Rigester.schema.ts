import * as zod from 'zod'

export const schema = zod.object({
  name: zod.string("required!").nonempty("Name is required").min(3, "minimum length is 3").max(15, "Max length is 15"),
  email: zod.email("Email isn't in formate"),
  password: zod.string("required!").nonempty("Password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"),
  rePassword: zod.string("required!").nonempty("Confirm password is reqired").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"),
  phone: zod.string("required!").nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, 'invalid phone number')
}).refine( function(object) {
    return object.password === object.rePassword
}, {path: ['rePassword'], error: "passwords are in-match"});
