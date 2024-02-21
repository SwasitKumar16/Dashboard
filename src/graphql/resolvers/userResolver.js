import prisma from "@/config/db";
import bcryptjs from "bcryptjs";
const userResolver = {
  Mutation: {
    registerUser: async (_, { input }) => {
      const { firstName, lastName, username, email, password } = input;

      const existingEmail = await prisma.users.findUnique({ where: { email } });
      if (existingEmail) {
        throw new Error("Email already exists");
      }
      const existingUsername = await prisma.users.findUnique({
        where: { username },
      });
      if (existingUsername) {
        throw new Error("Username already exists");
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = await prisma.users.create({
        data: {
          username,
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });

      return newUser;
    },
    loginUser: async (_, { input }) => {
      const { email, password } = input;

      const existingEmail = await prisma.users.findUnique({ where: { email } });
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      if (existingEmail.email === email)
        return {
          message: "Logged In",
          status: true,
        };
      else
        return {
          message: "Failed",
          status: false,
        };
    },
  },
};
export default userResolver;
