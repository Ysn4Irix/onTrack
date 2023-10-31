import { DataTable } from './components/DataTable'
import { columns } from './components/Columns'
import { AiOutlineLoading } from 'react-icons/ai'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import prisma from '@/prisma/client'
import { currentUser } from '@clerk/nextjs'

const fetchIssues = async () => {
  const user = await currentUser()

  return await prisma.issue.findMany({
    where: {
      userId: user?.id,
    },
  })
}

const Issues = async () => {
  let loading = false

  loading = true
  const data = await fetchIssues()
  loading = false

  return (
    <div className="flex-1 space-y-4 p-8 pt-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Issues</h2>
        <div className="flex flex-row items-center justify-center space-x-2">
          <Link href="/issues/new">
            <Button className="px-3">New Issue</Button>
          </Link>
        </div>
      </div>
      <p className="text-muted-foreground">Here&apos; s a list of all the issues you&apos;ve created.</p>
      {loading ? (
        <div className="flex items-center justify-center max-h-full">
          <AiOutlineLoading className="animate-spin w-10 h-10 text-rose-600" />
        </div>
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  )
}

export default Issues
