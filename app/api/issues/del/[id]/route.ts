import prisma from '@/prisma/client'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  const user = await currentUser()

  try {
    await prisma.issue.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log((error as Error).message)
    return NextResponse.json({ status: 400 })
  }
}
