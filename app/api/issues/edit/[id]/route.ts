import { editSchema } from '@/app/issues/schemas/EditSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (
  request: NextRequest,
  {
    params,
  }: {
    params: {
      id: string
    }
  }
) => {
  const body = await request.json()
  const validated = editSchema.safeParse(body)

  if (!validated.success) {
    return NextResponse.json({ errors: validated.error }, { status: 400 })
  }

  const { title, description, status } = validated.data

  const user = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!user) {
    return NextResponse.json({ errors: ['User not found'] }, { status: 404 })
  }

  const issue = await prisma.issue.update({
    where: {
      id: params.id,
    },
    data: {
      title,
      description,
      status,
    },
  })
  return NextResponse.json(issue)
}
