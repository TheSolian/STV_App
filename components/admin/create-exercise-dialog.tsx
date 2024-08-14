import { createExercise } from '@/actions/admin/create-exercise'
import { getCategories } from '@/actions/get-categories'
import { getExerciseTypes } from '@/actions/get-exercise-types'
import { storage } from '@/lib/firebase'
import { cn } from '@/lib/utils'
import { CreateExerciseSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Category, ExerciseType } from '@prisma/client'
import { getDownloadURL, getMetadata, ref, uploadBytes } from 'firebase/storage'
import {
  CheckIcon,
  FileIcon,
  MousePointerSquareDashedIcon,
  PlusIcon,
  XIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ElementType, useEffect, useState, useTransition } from 'react'
import Dropzone from 'react-dropzone'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

type Props = {
  triggerLabel: string
}

export const CreateExerciseDialog: React.FC<Props> = ({ triggerLabel }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<Category>()
  const [types, setTypes] = useState<ExerciseType[]>([])
  const [type, setType] = useState<ExerciseType>()

  const form = useForm<z.infer<typeof CreateExerciseSchema>>({
    resolver: zodResolver(CreateExerciseSchema),
    defaultValues: {
      name: '',
      number: '',
      difficulty: '',
      categoryId: '',
      typeId: '',
      image: '',
    },
  })

  useEffect(() => {
    const run = async () => {
      const cs = await getCategories()
      setCategories(cs)
      setCategory(cs[0])
      form.setValue('categoryId', cs[0].id)
      const ts = await getExerciseTypes()
      setTypes(ts)
      setType(ts[0])
      form.setValue('typeId', ts[0].id)
    }
    run()
  }, [form])

  const onSubmit = async (values: z.infer<typeof CreateExerciseSchema>) => {
    if (image === null) return

    startTransition(async () => {
      try {
        const imageRef = ref(storage, image.name)

        await uploadBytes(imageRef, image)

        const downloadUrl = await getDownloadURL(imageRef)

        const data = await createExercise({
          name: values.name,
          number: values.number,
          difficulty: values.difficulty,
          categoryId: values.categoryId,
          typeId: values.typeId,
          image: downloadUrl,
        })

        if (data.sucess) {
          form.reset()
          setIsOpen(false)
          router.refresh()
        }
      } catch (err) {}

      // const imageRef = ref(storage, '50815.png')

      // const url = await getDownloadURL(imageRef)
      // console.log(url)

      // https://firebasestorage.googleapis.com/v0/b/stv-app-8daf1.appspot.com/o/50815.png?alt=media&token=b2fc4b9b-fefd-4c77-ab56-851400afc72e
      // https://firebasestorage.googleapis.com/v0/b/stv-app-8daf1.appspot.com/o/50203.png?alt=media&token=00be6c33-5588-47cc-96e5-8ccfb4e66644
    })
  }

  const onDropAccepted = async (files: File[]) => {
    setImage(files[0])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 size-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Element erstellen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Feldaufzug"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="number">Turnsprache #</FormLabel>
                  <Input
                    type="text"
                    placeholder="50815"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                  <FormMessage>
                    {form.formState.errors.number?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="difficulty"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="difficulty">Kategorie</FormLabel>
                  <Input
                    type="text"
                    placeholder="5"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                  <FormMessage>
                    {form.formState.errors.difficulty?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="categoryId">Gerät</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={isPending}
                          className="w-full"
                        >
                          {category?.name}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {categories.map((c) => (
                          <DropdownMenuItem
                            key={c.id}
                            onClick={() => {
                              setCategory(c)
                              form.setValue('categoryId', c.id)
                            }}
                            className={cn(
                              'flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100',
                              {
                                'bg-zinc-100': category?.id === c.id,
                              },
                            )}
                          >
                            <CheckIcon
                              className={cn(
                                'mr-2 size-4',
                                category?.id === c.id
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {c.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="typeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="typeId">Elementart</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={isPending}
                          className="w-full truncate"
                        >
                          {type?.name}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {types.map((t) => (
                          <DropdownMenuItem
                            key={t.id}
                            onClick={() => {
                              setType(t)
                              form.setValue('typeId', t.id)

                              // console.log(form.getValues())
                            }}
                            className={cn(
                              'flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100',
                              {
                                'bg-zinc-100': type?.id === t.id,
                              },
                            )}
                          >
                            <CheckIcon
                              className={cn(
                                'mr-2 size-4',
                                type?.id === t.id ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {t.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Bild</FormLabel>
                  {image === null ? (
                    <>
                      <div
                        className={cn(
                          'relative flex h-40 w-full flex-1 flex-col items-center justify-center rounded-md bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10',
                          {
                            'bg-blue-900/10 ring-blue-900/25': isDragOver,
                          },
                        )}
                      >
                        <Dropzone
                          multiple={false}
                          accept={{
                            'image/png': ['.png'],
                            'image/jpeg': ['.jpeg'],
                            'image/jpg': ['.jpg'],
                          }}
                          onDropAccepted={onDropAccepted}
                          // onDropRejected={onDropRejected}
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
                                    <span className="font-semibold">
                                      Datei ablegen
                                    </span>{' '}
                                    um hochzuladen
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
                                <p className="text-xs text-zinc-500">
                                  JPG, PNG, Max. 1
                                </p>
                              )}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      <FormMessage>
                        {form.formState.errors.image?.message}
                      </FormMessage>
                    </>
                  ) : null}
                  {image ? (
                    <div className="relative">
                      <Button
                        className="absolute -right-3 -top-3 rounded-full"
                        size="icon"
                        onClick={() => setImage(null)}
                      >
                        <XIcon className="size-4" />
                      </Button>
                      <Image
                        src={URL.createObjectURL(image)}
                        width={0}
                        height={0}
                        alt={image.name}
                        className="h-40 w-full rounded-md border"
                      />
                    </div>
                  ) : null}
                </FormItem>
              )}
            />
            <div className="col-span-2 flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isPending}
                  onClick={() => form.reset()}
                >
                  Abbrechen
                </Button>
              </DialogClose>
              <Button disabled={isPending}>Erstellen</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
