"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiEdit3 } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { InsertPostType } from "@/db/schema";
import { postSchema, PostValues } from "@/lib/validations";
import RichTextEditor from "@/components/RichTextEditor";
import LoadingBtn from "@/components/LoadingBtn";
import { editPost } from "../actions";

export default function Editpost({ post }: { post: InsertPostType }) {
  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      id: String(post.id),
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: PostValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await editPost(formData);
    } catch (error) {
      toast({
        title: "Edited",
        description: `Post Edited Successfully. `,
      });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="my-4">
        <FiEdit3 className="size-5 cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit postme</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-6 p-2"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        onChange={field.onChange}
                        // ref={field.ref}
                        initialContent={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingBtn
                type="submit"
                className="w-full"
                loading={isSubmitting}
              >
                Submit
              </LoadingBtn>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
