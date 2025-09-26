import * as zod from 'zod'
import { paySchema } from './paymentSchema'

export type PaymentFormType = zod.infer<typeof paySchema>;


export type shippingAddressType = {
    details: string,
    phone: string,
    city: string
}