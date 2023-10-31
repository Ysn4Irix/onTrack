'use client'
import Link from 'next/link'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

interface DataTableRowActionsProps {
  actions: {
    view: string
    edit: string
    delete: string
  }
}

export function DataTableRowActions({ actions }: DataTableRowActionsProps) {
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.delete(`/api/issues/del/${actions.delete}`)

      if (res.status === 200) {
        toast({
          variant: 'default',
          title: 'Success',
          className: 'bg-[#1C8039] dark:bg-green-700',
          description: 'Issue deleted successfully',
        })
        router.refresh()
      }
    } catch (error) {
      console.log((error as Error).message)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `There was an error submitting your request.`,
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link className="cursor-pointer" href={`/issues/${actions.view}`}>
          <DropdownMenuItem>View</DropdownMenuItem>
        </Link>
        <Link className="cursor-pointer" href={`/issues/edit/${actions.edit}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <form onSubmit={onSubmit}>
          <DropdownMenuItem>
            <input className="cursor-pointer text-left w-full" type="submit" value="Delete" />
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
