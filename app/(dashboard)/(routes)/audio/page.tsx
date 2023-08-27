"use client";

import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/ui/Heading";
import { LucideIcon, MessageSquare, Music } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Loader } from "@/components/ui/Loader";
import { Empty } from "@/components/ui/Empty";
import { formSchema } from "./constants";
import { useProModal } from "@/hooks/useProModal";
import toast from "react-hot-toast";

const AudioPage = () => {
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const router = useRouter();
  const [audio, setAudio] = useState<string>();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setAudio(undefined);
      const response = await axios.post("/api/audio", values);

      setAudio(response.data.audio);
      // console.log(messages);
      form.reset();
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Audio generation"
        description="Tur your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-10">
                  <FormControl className="m-0 p-0 ">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                      disabled={isLoading}
                      placeholder="Type something to generate audio"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 md:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 space-x-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {!audio && !isLoading && <Empty label="No Audio Generated." />}
        {audio && (
          <audio controls className="w-full mt-8">
            <source src={audio} />
          </audio>
        )}
      </div>
    </div>
  );
};

export default AudioPage;
