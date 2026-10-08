import { listResources, type Database } from "../db/resources.ts";
export async function handleResources(
  request: Request,
  db?: Database,
): Promise<Response> {
  if (request.method !== "GET")
    return new Response(null, { status: 405, headers: { Allow: "GET" } });
  if (!db)
    return Response.json(
      { error: "The optional catalogue is not configured." },
      { status: 503 },
    );
  try {
    return Response.json(
      { resources: await listResources(db) },
      { headers: { "Cache-Control": "public, max-age=60" } },
    );
  } catch {
    return Response.json(
      { error: "The catalogue is temporarily unavailable." },
      { status: 503 },
    );
  }
}
