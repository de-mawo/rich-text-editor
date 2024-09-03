"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import RichTextEditor from "./RichTextEditor";
import LoadingBtn from "./LoadingBtn";
import { postSchema, PostValues } from "@/lib/validations";
import { createPost } from "@/app/actions";



export default function AddText() {
  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
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
      await createPost(formData);
    } catch (error) {
      toast({
        title: "Added",
        description: `New Post added successfully. `,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-2"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
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
                <RichTextEditor  onChange={field.onChange}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingBtn type="submit" loading={isSubmitting}>
          Submit
        </LoadingBtn>
      </form>
    </Form>
  );
}
