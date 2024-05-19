import * as z from 'zod'

const childrenSchema = z.object({
    childrenName:z.string()
})
 export const applicationResolver = z.object({
    name:z.string().min(1,{message:'Name is required'}),
    grandFatherName:z.string().min(1),
    fatherName:z.string(),
    motherName:z.string(),
    spouseName:z.string().optional(),
    children: z.array(childrenSchema).optional(),
    citizenshipNo:z.string(),
    citizenshipFrontImage:z.boolean().optional(),
    citizenshipBackImage:z.boolean().optional(),
    bankName:z.string(),
    accountHolderName:z.string(),
    accountNumber:z.string()
})


export const loginSchema = z.object({
    email:z.string().email({message:"Email is required"}),
    password:z.string().min(8,{message:"Password should be minimum of eight character"})
})