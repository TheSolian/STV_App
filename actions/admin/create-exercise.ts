'use server'

import { db } from '@/prisma'
import { CreateExerciseSchema } from '@/schemas'
import { z } from 'zod'

export const createExercise = async (
  values: z.infer<typeof CreateExerciseSchema>,
) => {
  await db.exercise.create({
    data: {
      ...values,
    },
  })

  return { sucess: 'Benutzer erstellt!' }
}
