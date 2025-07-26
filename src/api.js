const API_URL = "http://localhost:3001/goals"

export const fetchGoals = async () => {
  const response = await fetch(API_URL)
  return await response.json()
}

export const addGoal = async (goal) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  })
  return await response.json()
}

export const updateGoal = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })
  return await response.json()
}

export const deleteGoal = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
}
