"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { InsertPostType } from "@/db/schema";
import EditPost from "./EditPost";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostCard({ post }: { post: InsertPostType }) {
  dayjs.extend(relativeTime);
  const timeago = dayjs().from(dayjs(post.updatedAt));
  return (
    <div className="flex flex-col rounded-md border border-violet-400 bg-white p-2">
      <div className="relative max-h-48 max-w-md overflow-hidden rounded-md">
        <Image
          src="/article.png"
          alt=""
          width={1280}
          height={853}
          className={cn(
            "-z-10 aspect-square h-full w-full object-cover transition-all hover:scale-105",
          )}
        />
      </div>

      <div className="">
        <h3 className="my-3 line-clamp-1 text-lg">{post.title}</h3>

        <div className="flex justify-between">
          <Button asChild>
            <Link href={`/posts/${post.slug}?id=${post.id}`}>View</Link>
          </Button>

          <EditPost post={post} />
        </div>
        <div className="flex justify-end text-xs text-muted-foreground">
          <span>Last modified:</span> {timeago}
        </div>
      </div>
    </div>
  );
}
