import  z  from "zod";

export const transactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  amount: z.string().regex(/^-?\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type must be either 'income' or 'expense'" }),
  }),
  category: z.string().min(1, "Category is required"),
  date: z.coerce.date()
});