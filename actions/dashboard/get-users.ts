'use server'

import { db } from '@/prisma'

export const getUsers = async () => {
  const data = await db.user.findMany({
    include: {
      exercises: {
        include: {
          exercises: true,
        },
      },
    },
  })

  const users = data.map((user) => ({
    id: user.id,
    name: user.name,
    exercises: user.exercises.map((exercise) => exercise.exercises),
  }))

  return users
}
