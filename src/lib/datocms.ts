export async function performRequest({ query, variables = {} }: { query: string, variables?: Record<string, unknown> }) {
  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Atualiza os dados a cada 60 segundos
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
  }

  return responseBody.data;
}