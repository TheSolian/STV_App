'use server'

import { db } from '@/prisma'

export const getExercises = async () => {
  const data = await db.exercise.findMany({
    include: {
      users: {
        include: {
          users: true,
        },
      },
    },
  })

  const exercises = data.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    users: exercise.users.map((user) => {
      return {
        ...user.users,
        able: user.able,
      }
    }),
  }))

  return exercises
}
