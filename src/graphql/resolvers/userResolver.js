import prisma from "@/config/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// require("dotenv").config();
const JWT_SECRET = "assignment1";
const userResolver = {
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { firstName, lastName, username, email, password } = input;

        const existingEmail = await prisma.users.findUnique({
          where: { email },
        });
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
      } catch (error) {
        throw new Error(error.message);
      }
    },
    loginUser: async (_, { input }) => {
      try {
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
          const tokenData = {
            id: id,
            username: user.username,
            email: user.email,
          };
          const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1d" });
          console.log("JWT_SECRET:", JWT_SECRET);
          console.log(token);
          return {
            message: "Logged In",
            status: true,
            id,
            token,
          };
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    registerAdmin: async (_, { input }) => {
      try {
        const { firstName, lastName, username, email, password, userId } =
          input;

        const existingEmail = await prisma.admin.findUnique({
          where: { email },
        });
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
        const newAdmin = await prisma.admin.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword,
            userId,
          },
        });

        return newAdmin;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    loginAdmin: async (_, { input }) => {
      try {
        const { email, password } = input;
        const admin = await prisma.admin.findUnique({ where: { email } });

        if (!admin) {
          return {
            message: "Admin not found",
            status: false,
          };
        }
        const id = admin.admin_id;

        const isPasswordValid = await bcryptjs.compare(
          password,
          admin.password
        );

        if (isPasswordValid && email === admin.email) {
          return {
            message: "Logged In",
            status: true,
            admin_id: id,
          };
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    editUser: async (_, { input }) => {
      try {
        const { firstName, lastName, username, email } = input;

        await prisma.users.update({
          where: {
            email,
          },
          data: {
            firstName,
            lastName,
            username,
          },
        });
        return {
          status: true,
          message: "Profile updated successfully",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const userId = parseInt(id, 10);

        await prisma.$transaction(async (tx) => {
          await tx.admin.deleteMany({
            where: {
              userId,
            },
          });

          await tx.user.delete({
            where: {
              userId,
            },
          });
        });
        return {
          message: "Deleted user Successfully",
          status: true,
        };
      } catch (error) {
        throw new Error(error.message);
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
