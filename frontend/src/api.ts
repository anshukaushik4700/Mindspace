
const API_URL = "https://mental-health-backend.anshukaushik4700.workers.dev" 

export async function apiRequest(path: string, method: string, body?: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Request failed")
  return data
}
