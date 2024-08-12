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

export const getUsersByExerciseId = async (id: string) => {
  const exercise = await db.exercise.findUnique({
    where: { id },
    include: {
      users: {
        include: {
          users: true,
        },
      },
    },
  })

  if (!exercise) return

  const users = exercise.users.map((user) => {
    return {
      able: user.able,
      name: user.users.name,
      id: user.users.id,
    }
  })

  return users
}
