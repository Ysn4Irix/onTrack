import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Overview } from './issues/components/Overview'
import { RecentIssues } from './issues/components/RecentIssues'
import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { JsonObject } from '@prisma/client/runtime/library'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for issue tracker app. View analytics, reports, and more.',
}

export default async function Dashboard() {
  const issueCount = await prisma.issue.count()
  const lastMonthCount = await prisma.issue.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  })
  const lastMonthOpenIssueCount = await prisma.issue.count({
    where: {
      status: 'OPEN',
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  })
  const lastMonthIssuesPercentageFormat = Math.round((issueCount / lastMonthCount) * 100) / 100

  const openIssueCount = await prisma.issue.count({
    where: {
      status: 'OPEN',
    },
  })
  const lastMonthOpenIssuePercentageFormat = Math.round((lastMonthOpenIssueCount / lastMonthCount) * 100) / 100

  const closedIssueCount = await prisma.issue.count({
    where: {
      status: 'CLOSED',
    },
  })

  const totalIssuesClosedLastHour = await prisma.issue.count({
    where: {
      status: 'CLOSED',
      updatedAt: {
        gte: new Date(new Date().setHours(new Date().getHours() - 1)),
      },
    },
  })

  const totalIssueThisMonth = await prisma.issue.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  })

  const totalIssuesGroupedByUser = await prisma.issue.groupBy({
    by: ['userId'],
    _count: {
      userId: true,
    },
    take: 5,
    orderBy: {
      _count: {
        userId: 'asc',
      },
    },
  })

  const groupedByUser = await Promise.all(
    totalIssuesGroupedByUser.map(async (issue) => {
      const user = await prisma.user.findUnique({
        where: {
          externalId: issue.userId,
        },
      })

      return {
        id: issue.userId,
        attributes: user?.attributes as Prisma.JsonObject,
        totalIssues: issue._count.userId,
      }
    })
  )

  const totalIssuesPerMonth = await prisma.issue.groupBy({
    by: ['createdAt'],
    _count: {
      createdAt: true,
    },
  })

  const initData = [
    {
      name: 'Jan',
      month: 1,
      total: 0,
    },
    {
      name: 'Feb',
      month: 2,
      total: 0,
    },
    {
      name: 'Mar',
      month: 3,
      total: 0,
    },
    {
      name: 'Apr',
      month: 4,
      total: 0,
    },
    {
      name: 'May',
      month: 5,
      total: 0,
    },
    {
      name: 'Jun',
      month: 6,
      total: 0,
    },
    {
      name: 'Jul',
      month: 7,
      total: 0,
    },
    {
      name: 'Aug',
      month: 8,
      total: 0,
    },
    {
      name: 'Sep',
      month: 9,
      total: 0,
    },
    {
      name: 'Oct',
      month: 10,
      total: 0,
    },
    {
      name: 'Nov',
      month: 11,
      total: 0,
    },
    {
      name: 'Dec',
      month: 12,
      total: 0,
    },
  ]

  const overviewData = totalIssuesPerMonth.reduce((acc, issue) => {
    const month = new Date(issue.createdAt).getMonth() + 1
    const monthData = acc.find((data) => data.month === month)

    if (monthData) {
      monthData.total += issue._count.createdAt
    }

    return acc
  }, initData)

  return (
    <div className="flex-1 space-y-4 p-8 pt-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 sm:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                      d="M8 9.5C8.39782 9.5 8.77936 9.34196 9.06066 9.06066C9.34196 8.77936 9.5 8.39782 9.5 8C9.5 7.60218 9.34196 7.22064 9.06066 6.93934C8.77936 6.65804 8.39782 6.5 8 6.5C7.60218 6.5 7.22064 6.65804 6.93934 6.93934C6.65804 7.22064 6.5 7.60218 6.5 8C6.5 8.39782 6.65804 8.77936 6.93934 9.06066C7.22064 9.34196 7.60218 9.5 8 9.5Z"
                      fill="#E11D48"
                    />
                    <path
                      d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8Z"
                      fill="#E11D48"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_5">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{issueCount}</div>
                <p className="text-xs text-muted-foreground">+{lastMonthIssuesPercentageFormat}% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                      d="M8 9.5C8.39782 9.5 8.77936 9.34196 9.06066 9.06066C9.34196 8.77936 9.5 8.39782 9.5 8C9.5 7.60218 9.34196 7.22064 9.06066 6.93934C8.77936 6.65804 8.39782 6.5 8 6.5C7.60218 6.5 7.22064 6.65804 6.93934 6.93934C6.65804 7.22064 6.5 7.60218 6.5 8C6.5 8.39782 6.65804 8.77936 6.93934 9.06066C7.22064 9.34196 7.60218 9.5 8 9.5Z"
                      fill="#1C8039"
                    />
                    <path
                      d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8Z"
                      fill="#1C8039"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_5">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{openIssueCount}</div>
                <p className="text-xs text-muted-foreground">+{lastMonthOpenIssuePercentageFormat}% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Closed Issues</CardTitle>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                      d="M11.28 6.78C11.4125 6.63782 11.4846 6.44978 11.4812 6.25548C11.4777 6.06118 11.399 5.87579 11.2616 5.73838C11.1242 5.60096 10.9388 5.52225 10.7445 5.51882C10.5502 5.5154 10.3622 5.58752 10.22 5.72L7.25 8.69L5.78 7.22C5.63782 7.08752 5.44978 7.0154 5.25548 7.01882C5.06118 7.02225 4.87579 7.10096 4.73838 7.23838C4.60096 7.37579 4.52225 7.56118 4.51882 7.75548C4.5154 7.94978 4.58752 8.13782 4.72 8.28L6.72 10.28C6.86062 10.4204 7.05125 10.4993 7.25 10.4993C7.44875 10.4993 7.63937 10.4204 7.78 10.28L11.28 6.78Z"
                      fill="#8250DF"
                    />
                    <path
                      d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8Z"
                      fill="#8250DF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_2">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{closedIssueCount}</div>
                <p className="text-xs text-muted-foreground">+{totalIssuesClosedLastHour} since last hour</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
            <Card className="sm:col-span-1">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {' '}
                <Overview data={overviewData} />
              </CardContent>
            </Card>
            <Card className="sm:col-span-1">
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
                <CardDescription>They are {totalIssueThisMonth} issues this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {groupedByUser.map(({ id, attributes, totalIssues }) => (
                    <RecentIssues
                      key={id}
                      avatar={attributes.image_url as string}
                      fullName={`${attributes.first_name as string} ${attributes.last_name as string}`}
                      totalIssues={totalIssues as number}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
