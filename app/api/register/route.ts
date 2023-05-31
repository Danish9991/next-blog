import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "../../lib/prismadb";

/**
 * 
 * @param request saves the credentails to db
 * @returns 
 */
export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
