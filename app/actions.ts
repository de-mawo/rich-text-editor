"use server";

import { db } from "@/db/drizzle";
import { InsertPostType, postsTable } from "@/db/schema";
import { toSlug } from "@/lib/utils";
import { postSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // Parse form data using the schema
  const values = Object.fromEntries(formData.entries());
  const { title, description } = postSchema.parse(values);

  // Generate slug from the title
  const slug = toSlug(title);

  const newProg: InsertPostType = {
    title,
    description,
    slug,
  };

  await db.insert(postsTable).values(newProg);

  redirect("/posts");
}

export async function editPost(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { id, title, description } = postSchema.parse(values);

  await db
    .update(postsTable)
    .set({ title, description })
    .where(eq(postsTable.id, Number(id)));

  // Redirect to the post dashboard
  revalidatePath("/posts");
}
