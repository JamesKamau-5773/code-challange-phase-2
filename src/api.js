const API_URL = "https://code-challange-phase-2-01.onrender.com/goals"

// Fallback data when backend is unavailable
const FALLBACK_GOALS = [
  {
    id: "1",
    name: "Travel Fund - Japan",
    targetAmount: 5000,
    savedAmount: 3200,
    category: "Travel",
    deadline: "2025-12-31",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 7500,
    category: "Emergency",
    deadline: "2026-06-30",
    createdAt: "2023-05-01"
  },
  {
    id: "3",
    name: "New Car",
    targetAmount: 25000,
    savedAmount: 8000,
    category: "Transportation",
    deadline: "2025-08-15",
    createdAt: "2024-02-01"
  }
]

export const fetchGoals = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.warn('Backend unavailable, using fallback data:', error.message)
    return FALLBACK_GOALS
  }
}

export const addGoal = async (goal) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.warn('Backend unavailable, simulating add:', error.message)
    return { ...goal, id: Date.now().toString() }
  }
}

export const updateGoal = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.warn('Backend unavailable, simulating update:', error.message)
    return { id, ...updates }
  }
}

export const deleteGoal = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.warn('Backend unavailable, simulating delete:', error.message)
  }
}
