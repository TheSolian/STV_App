'use client'

import { importUsers } from '@/actions/admin/import-users'
import { cn } from '@/lib/utils'
import {
  FileIcon,
  MousePointerSquareDashedIcon,
  UploadIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

type Props = {}

export const ImportUserDialog: React.FC<Props> = ({}) => {
  const router = useRouter()

  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    const res = await importUsers(await file.text())
    if (res.success) {
      router.refresh()
      setIsOpen(false)
      toast('Benutzer erfolgreich importiert!')
    }
  }

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    console.log(rejectedFiles)

    // TODO: Handle errors
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <UploadIcon className="mr-2 size-4" />
          Benutzer Importieren
        </Button>
      </DialogTrigger>
      <DialogContent className="h-80 grid-rows-[25px,1fr]">
        <DialogHeader>
          <DialogTitle>Benutzer importieren</DialogTitle>
        </DialogHeader>
        <div
          className={cn(
            'relative flex size-full flex-1 flex-col items-center justify-center rounded-md bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl',
            {
              'bg-blue-900/10 ring-blue-900/25': isDragOver,
            },
          )}
        >
          <Dropzone
            multiple={false}
            accept={{
              'text/csv': ['.csv'],
            }}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex size-full flex-1 flex-col items-center justify-center"
              >
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashedIcon className="mb-2 size-6 text-zinc-500" />
                ) : (
                  <FileIcon className="mb-2 size-6 text-zinc-500" />
                )}
                <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                  {isDragOver ? (
                    <p>
                      <span className="font-semibold">Datei ablegen</span> um
                      hochzuladen
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">
                        Klicken um hochzuladen
                      </span>{' '}
                      oder drag and drop
                    </p>
                  )}
                </div>

                {false ? null : (
                  <p className="text-xs text-zinc-500">CSV, Max. 1</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </DialogContent>
    </Dialog>
  )
}
