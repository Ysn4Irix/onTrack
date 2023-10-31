'use client'
import { ColumnDef } from '@tanstack/react-table'
import { statuses } from '../data/data'
import { Issue } from '../schemas/IssueSchema'
import { DataTableColumnHeader } from './DataTableColumnHeader'
import { DataTableRowActions } from './DataTableRowActions'
import classNames from 'classnames'

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Issue" />,
    cell: ({ row }) => <div className="w-[200px] p-2">{row.getValue('id')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <div className="w-[250px]">{row.getValue<string>('title').slice(0, 50) + '...'}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => <div className="w-[300px]">{row.getValue<string>('description').slice(0, 50) + '...'}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon
              className={classNames({
                'h-4 w-4 mr-2': true,
                'text-[#1C8039]': status.value === 'OPEN',
                'text-[#8250DF]': status.value === 'CLOSED',
              })}
            />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => <div className="w-[220px]">{new Date(row.getValue<string>('createdAt')).toUTCString()}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Updated" />,
    cell: ({ row }) => <div className="w-[220px]">{new Date(row.getValue<string>('updatedAt')).toUTCString()}</div>,
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        actions={{
          view: row.getValue('id'),
          edit: row.getValue('id'),
          delete: row.getValue('id'),
        }}
      />
    ),
  },
]
