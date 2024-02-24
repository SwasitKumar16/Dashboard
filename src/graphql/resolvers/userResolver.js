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
      const user = await prisma.users.findUnique({ where: { email } });

      if (!user) {
        return {
          message: "User not found",
          status: false,
        };
      }
      const id = user.id;

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (isPasswordValid && email === user.email) {
        return {
          message: "Logged In",
          status: true,
          id,
        };
      } else {
        return {
          message: "Invalid password",
          status: false,
        };
      }
    },
  },
  Query: {
    getUser: async (_, { id }) => {
      const userId = parseInt(id, 10);
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  },
};
export default userResolver;
