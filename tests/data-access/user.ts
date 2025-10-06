import prisma from "@/db";

export async function deleteUser({ email }: { email: string }) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (foundUser) {
      const deletedUser = await prisma.user.delete({
        where: {
          email
        }
      });

      console.log(`User with email: ${deletedUser.email} deleted`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateUserRole({ email, role }: { email: string; role: string }) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        role
      }
    });

    console.log(`User ${updatedUser.email} updated with role ${role}`);
  } catch (error) {
    console.error("Error updating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}
