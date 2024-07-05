'use server'

import { db } from '@/prisma'

export type RemoveExerciseFromUserArgs = {
  exerciseId: string
  userId: string
}

export const removeExerciseFromUserList = async ({
  exerciseId,
  userId,
}: RemoveExerciseFromUserArgs) => {
  const exerciseUser = await db.exerciseUser.findFirst({
    where: {
      AND: {
        exerciseId,
        userId,
      },
    },
  })

  if (exerciseUser) {
    await db.exerciseUser.delete({
      where: {
        id: exerciseUser.id,
      },
    })
  }
}
