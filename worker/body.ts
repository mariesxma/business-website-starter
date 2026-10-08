export class BodyError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export async function readJson(
  request: Request,
  maxBytes = 24000,
): Promise<Record<string, unknown>> {
  if (
    request.headers.get("Content-Type")?.split(";")[0].trim() !==
    "application/json"
  )
    throw new BodyError(415, "Send a JSON request.");
  if (Number(request.headers.get("Content-Length")) > maxBytes)
    throw new BodyError(413, "Your enquiry is too long.");
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError(400, "Please complete the enquiry form.");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new BodyError(413, "Your enquiry is too long.");
      }
      chunks.push(value);
    }
    const buffer = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }
    const data: unknown = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(buffer),
    );
    if (!data || typeof data !== "object" || Array.isArray(data))
      throw new BodyError(400, "Please complete the enquiry form.");
    return data as Record<string, unknown>;
  } catch (error) {
    if (error instanceof BodyError) throw error;
    throw new BodyError(400, "Invalid JSON request.");
  } finally {
    reader.releaseLock();
  }
}
