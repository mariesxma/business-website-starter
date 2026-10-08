export interface Database {
  prepare(sql: string): { all<T>(): Promise<{ results: T[] }> };
}
export interface Resource {
  id: number;
  title: string;
  description: string;
}
export async function listResources(db: Database): Promise<Resource[]> {
  const result = await db
    .prepare(
      "SELECT id, title, description FROM resources WHERE published = 1 ORDER BY id LIMIT 50",
    )
    .all<Resource>();
  return result.results;
}
