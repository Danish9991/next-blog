import { NextResponse } from "next/server";

import {getCurrentUser} from "@/app/actions/getCurrentUser";
import prisma from '../../../lib/prismadb'


interface IParams {
    blogId?:string
}

/**
 * DELETE methods deletes the blog post
 * @param request 
 * @param param1 
 * @returns 
 */

export async function DELETE(
    request:Request, {
        params
    }: {params:IParams}
) {
    const currentUser = await getCurrentUser()


    if(!currentUser) {
        return NextResponse.error()
    }

    const {blogId} = params


    if(!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id')
    }

    const listing = await prisma.blog.deleteMany({
        where: {
            id:blogId,
            userId:currentUser.id
        }
    });

    return NextResponse.json(listing)
}

/**
 * PUT method updated the blog
 * @param request 
 * @param param1 
 * @returns 
 */

export async function PUT( 
    request: Request, 
    {params}:{params:IParams}    
) {
    const {blogId} = params
    const json = await request.json()
    const currentUser = await getCurrentUser()


    if(!currentUser) {
        return NextResponse.error()
    }

    if(!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id')
    }

    const updated = await prisma.blog.update({
        where: {
            id: blogId,
        },
        data:  json
    })

    return NextResponse.json(updated)

}