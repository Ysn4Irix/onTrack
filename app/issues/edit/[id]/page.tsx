import { cache } from 'react'
import EditFrom from '../../components/EditFrom'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    select: {
      title: true,
      description: true,
      status: true,
    },
    where: {
      id: issueId,
    },
  })
)

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await fetchIssue(params.id)

  if (!issue) {
    notFound()
  }

  return (
    <EditFrom
      id={params.id}
      data={{
        title: issue.title,
        description: issue.description,
        status: issue.status,
      }}
    />
  )
}

export default EditIssuePage
