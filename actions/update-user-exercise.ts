'use server'

import { db } from '@/prisma'

export const updateUserExercise = async ({
  userId,
  exerciseId,
  able,
}: {
  userId: string
  exerciseId: string
  able: boolean
}) => {
  const exerciseUser = await db.exerciseUser.findFirst({
    where: {
      AND: {
        userId,
        exerciseId,
      },
    },
  })

  if (!exerciseUser) return { success: false, data: null }

  const exercise = await db.exerciseUser.update({
    where: {
      id: exerciseUser?.id,
    },
    data: {
      able,
    },
  })

  return { success: true, data: exercise }
}
