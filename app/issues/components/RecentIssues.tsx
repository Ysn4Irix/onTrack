import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface RecentIssuesProps {
  avatar: string
  fullName: string
  totalIssues: number
}
export function RecentIssues({ avatar, fullName, totalIssues }: RecentIssuesProps) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatar} alt="Avatar" />
        <AvatarFallback>{avatar}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{fullName}</p>
      </div>
      <div className="ml-auto font-medium">+ {totalIssues}</div>
    </div>
  )
}
