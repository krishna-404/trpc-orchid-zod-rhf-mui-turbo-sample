import { UserTable } from "../../db/schemas/user.table";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  signup: publicProcedure
    .input(UserTable.schema())
    .mutation(async () => {
      

    })
})