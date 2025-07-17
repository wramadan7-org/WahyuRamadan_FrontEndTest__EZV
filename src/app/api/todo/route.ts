import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("todos");
  return Response.json({ revalidated: true });
}
