import { addIssueSchema } from '@/app/issues/schemas/AddSchema'
import prisma from '@/prisma/client'
import { auth, currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const validated = addIssueSchema.safeParse(body)

  if (!validated.success) {
    return NextResponse.json({ errors: validated.error }, { status: 400 })
  }

  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ errors: ['Unauthorized'] }, { status: 401 })
  }

  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ errors: ['Unauthorized'] }, { status: 401 })
  }

  const { title, description } = validated.data

  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        userId,
      },
    })
    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    console.log((error as Error).message)
  }
}
