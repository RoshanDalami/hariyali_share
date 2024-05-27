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

export const registerSchema = z.object({
    username:z.string({message:"User name is required"}),
    email:z.string().email({message:"Email is required"}),
    contactNumber:z.number().min(10),
    password:z.string({message:"Password is required"}),
    confirmPassword:z.string({message:"Confirm password is required"})
})