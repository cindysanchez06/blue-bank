export const URL_BASE = "http://localhost:8000/api";

export async function fetchService({ uri, data, method, hasToken }) {
  const response = await fetch(`${URL_BASE}${uri}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  return response.json();
}
