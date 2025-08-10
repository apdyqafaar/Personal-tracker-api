import z from "zod";
export const loginSchemaZod=z.object({
    email:z.string(),
    password:z.string()
})