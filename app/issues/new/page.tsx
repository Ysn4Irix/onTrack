'use client'
import 'easymde/dist/easymde.min.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { AiOutlineLoading } from 'react-icons/ai'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { addIssueSchema } from '@/app/issues/schemas/AddSchema'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import SimpleMDE from 'react-simplemde-editor'

const NewIssuePage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof addIssueSchema>>({
    resolver: zodResolver(addIssueSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof addIssueSchema>) => {
    try {
      const res = await axios.post('/api/issues/add', data)

      if (res.status === 201) {
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
    <div className="flex flex-col justify-center items-center align-middle h-full mx-4">
      <Form {...form}>
        <Card className="container my-6">
          <CardHeader>
            <CardTitle className="text-xl">Create an Issue</CardTitle>
            <CardDescription>
              Please provide a title and description for your issue. You can also add an image or video to help describe
              the issue.
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="I have a..." {...field} />
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
                          <SimpleMDE placeholder="description" {...field} />
                        </FormControl>
                        <FormMessage className="text-rose-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="h-10" type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <i className="animate-spin">
                    <AiOutlineLoading />
                  </i>
                ) : (
                  'Submit Issue'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </div>
  )
}

export default NewIssuePage
