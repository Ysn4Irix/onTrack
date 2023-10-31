'use client'
import 'easymde/dist/easymde.min.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { AiOutlineLoading } from 'react-icons/ai'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import SimpleMDE from 'react-simplemde-editor'
import { editSchema } from '../schemas/EditSchema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  id: string
  data: {
    title: string | null
    description: string | null
    status: 'OPEN' | 'CLOSED'
  }
}

const EditFrom = (params: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: params.data.title as string,
      description: params.data.description as string,
      status: params.data.status,
    },
  })

  const onSubmit = async (data: z.infer<typeof editSchema>) => {
    try {
      const res = await axios.patch(`/api/issues/edit/${params.id}`, data)

      if (res.status === 200) {
        router.push('/issues')
        router.refresh()
      }
    } catch (error) {
      console.log((error as Error).message)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `There was an error submitting your issue.`,
      })
    }
  }

  return (
    <div className="flex flex-col justify-center items-center align-middle h-full m-4">
      <Form {...form}>
        <Card className="container my-6">
          <CardHeader>
            <CardTitle className="text-xl">Update an Issue</CardTitle>
            <CardDescription>
              Please provide a title and description for your issue. You can also add an image or video to help describe
              the issue.
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div>
                <div className="flex flex-col space-y-2 mb-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="I have a..." {...field} value={field.value} />
                        </FormControl>
                        <FormMessage className="text-rose-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <SimpleMDE placeholder="description" {...field} defaultValue={field.value} />
                        </FormControl>
                        <FormMessage className="text-rose-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="OPEN">Open</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-rose-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="h-10 px-4" type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <i className="animate-spin px-8">
                    <AiOutlineLoading />
                  </i>
                ) : (
                  'Update Issue'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </div>
  )
}

export default EditFrom
