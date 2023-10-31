import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/prisma/client'
import classNames from 'classnames'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { id: string }
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
)

const ViewIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(params.id)
  if (!issue) {
    notFound()
  }
  return (
    <div className="flex flex-col justify-center items-center align-middle h-full m-4">
      <Card className="container my-6">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-xl mb-2">{issue.title}</CardTitle>
            <Link href={`/issues/edit/${issue.id}`}>
              <Button className="h-10 px-8" type="submit">
                Edit
              </Button>
            </Link>
          </div>
          <CardDescription>
            Status:{' '}
            <Badge
              variant="outline"
              className={classNames({
                'bg-[#1C8039] text-white': issue.status === 'OPEN',
                'bg-[#8250DF] text-white': issue.status === 'CLOSED',
                'py-1 px-2': true,
              })}
            >
              {issue.status}
            </Badge>{' '}
            | Created On: <span className="font-semibold">{new Date(issue.createdAt).toLocaleDateString()}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start"></CardFooter>
      </Card>
    </div>
  )
}

export default ViewIssuePage
