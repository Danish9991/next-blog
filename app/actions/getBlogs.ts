import prisma from "../lib/prismadb";

export const getBlogs = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeBlogs = blogs.map((blog) => ({
      ...blog,
      createdAt: blog.createdAt.toISOString(),
    }));

    return safeBlogs;
  } catch (error: any) {
    throw new Error(error);
  }
};
