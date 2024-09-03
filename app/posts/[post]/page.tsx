import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { InsertPostType, postsTable } from "@/db/schema";
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';

const getPost = async (id: number): Promise<InsertPostType | null> => {
  // Return type is Post or null
  try {
    const post = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, id))
      .limit(1);

    return post.length > 0 ? post[0] : null; // Return a post object or null
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return null; // Return null in case of an error
  }
};

interface SearchParams {
  id: string;
}

export default async function SinglePost({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const id = Number(searchParams.id);
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      // Check if domNode is an instance of Element and has attribs
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === 'ul') {
          return (
            <ul className="list-disc ml-5">
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        }

        if (name === 'ol') {
          return (
            <ol className="list-decimal ml-5">
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        }

        if (name === 'p') {
          return (
            <p className="mb-4">
              {domToReact(children as DOMNode[], options)}
            </p>
          );
        }

        // Add more custom replacements as needed
      }
    },
  };

  return (
    <section className="mx-auto my-5 max-w-6xl">
      <div className="space-y-5">
        <h2 className="font-semibold">{post.title}</h2>
        {parse(post.description, options)}
      </div>
    </section>
  );
}
