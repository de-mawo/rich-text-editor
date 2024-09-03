import { db } from "@/db/drizzle";
import { postsTable } from "@/db/schema";
import PostCard from "./PostCard";

const getData = async () => {
  try {
    const data = await db.query.postsTable.findMany()
    return data
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return [];
  }
};

export default async function AllPosts() {
  const posts = await getData();


  


  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="my-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
