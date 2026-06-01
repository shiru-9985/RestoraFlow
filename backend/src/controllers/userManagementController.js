const { PrismaClient } =
  require("@prisma/client");

const bcrypt =
  require("bcryptjs");

const prisma =
  new PrismaClient();

const createUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      role
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    const temporaryPassword =
      "Temp@123";

    const hashedPassword =
      await bcrypt.hash(
        temporaryPassword,
        10
      );

    const user =
      await prisma.user.create({

        data: {
          name,
          email,
          role,
          password: hashedPassword,
          mustChangePassword: true
        }
      });

res.status(201).json({

  message:
    "User created successfully",

  temporaryPassword,

  user: {

    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    mustChangePassword:
      user.mustChangePassword
  }
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

const getAllUsers = async (
  req,
  res
) => {

  try {

    const users =
      await prisma.user.findMany({

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteUser = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await prisma.user.delete({
      where: { id }
    });

    res.json({
      message:
        "User deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};
const changePassword = async (
  req,
  res
) => {

  try {

    const {
      newPassword
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.user.update({

      where: {
        id: req.user.id
      },

      data: {

        password:
          hashedPassword,

        mustChangePassword:
          false
      }
    });

    res.json({
      message:
        "Password changed successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {

  createUser,
  getAllUsers,
  deleteUser,
  changePassword
};