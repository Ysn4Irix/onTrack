'use client'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface overviewData {
  data: {
    name: string
    month: number
    total: number
  }[]
}

export function Overview({ data }: overviewData) {
  return (
    <ResponsiveContainer height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(tick) => tick} />
        <Bar dataKey="total" fill="#E11D48" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
