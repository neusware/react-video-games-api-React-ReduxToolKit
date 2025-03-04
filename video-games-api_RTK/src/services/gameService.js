const API_KEY = "23aaa06072c14471b0a7df7f2cd79c5b"
const BASE_URL = "https://api.rawg.io/api"

async function fetchFromAPI(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    ...params,
  })
  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export async function fetchPopularGames() {
  return fetchFromAPI("/games", {
    ordering: "-rating",
    page_size: 10,
  })
}

export async function searchGames(query, page = 1) {
  return fetchFromAPI("/games", {
    search: query,
    page,
    page_size: 20,
  })
}

export async function fetchGameDetails(id) {
  return fetchFromAPI(`/games/${id}`)
}

export async function fetchGamesByCategory(type, id, page = 1) {
  return fetchFromAPI("/games", {
    [`${type}s`]: id,
    page,
    page_size: 20,
  })
}

export async function fetchPublisherDetails(id) {
  return fetchFromAPI(`/publishers/${id}`)
}

export async function fetchPublisherGames(id, page = 1) {
  return fetchFromAPI("/games", {
    publishers: id,
    page,
    page_size: 20,
  })
}

export async function searchPublishers(query = "", page = 1) {
  return fetchFromAPI("/publishers", {
    search: query,
    page,
    page_size: 20,
  })
}

