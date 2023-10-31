import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
import prisma from '@/prisma/client'

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || ''

async function handler(request: NextRequest) {
  const payload = await request.json()
  const headersList = headers()
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-signature': headersList.get('svix-signature'),
    'svix-timestamp': headersList.get('svix-timestamp'),
  }

  const webhook = new Webhook(WEBHOOK_SECRET)
  let evt: Event | null = null

  try {
    evt = webhook.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event
  } catch (error) {
    console.log((error as Error).message)
    return NextResponse.json({}, { status: 400 })
  }

  const eventType: EventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data

    await prisma.user.upsert({
      where: {
        externalId: id as string,
      },
      create: {
        externalId: id as string,
        attributes,
      },
      update: {
        attributes,
      },
    })

    return NextResponse.json(
      {
        message: 'User created/updated',
      },
      { status: 201 }
    )
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data

    const user = await prisma.user.findUnique({
      where: {
        externalId: id as string,
      },
    })

    if (!user) {
      return NextResponse.json({}, { status: 404 })
    }

    await prisma.user.delete({
      where: {
        externalId: id as string,
      },
    })

    return NextResponse.json(
      {
        message: 'User deleted',
      },
      { status: 200 }
    )
  }
  return NextResponse.json({}, { status: 200 })
}

type EventType = 'user.created' | 'user.updated' | 'user.deleted' | '*'

type Event = {
  data: Record<string, string | number>
  object: 'event'
  type: EventType
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
