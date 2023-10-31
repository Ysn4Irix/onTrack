import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { StarFilledIcon } from '@radix-ui/react-icons'
import React from 'react'

const about = () => {
  return (
    <div className="flex justify-center items-center h-full my-16 mx-32">
      <Card className="w-auto">
        <CardHeader>
          <CardTitle className="text-xl">About this Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col space-y-1.5 mt-3">
                This project is the live version of a fullstack application using Next.js, Prisma, and Tailwind CSS. It
                is intended to be a issue tracker. The project is open source and can be found on GitHub.
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <a href="https://gihtub.com/Ysn4Irix/onTrack" target="_blank">
            <Button className="h-10 pr-5">
              <StarFilledIcon className="h-4 w-4 mr-2" /> Star on GitHub
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default about
