import * as zod from 'zod'

export const paySchema = zod.object({
    details: zod.string("required!").nonempty("is required").min(3, "min length 3").max(50, "max 50"),
    phone: zod.string("required!").nonempty("Phone is required").regex(/^01[0125][0-9]{8}$/, 'invalid phone number'),
    city: zod.string("required").nonempty("Required"),
    paymentWay: zod.enum(['cash', 'credit'],)
})