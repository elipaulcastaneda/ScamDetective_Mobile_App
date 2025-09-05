"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleTextScan, type State } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ScanLine } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters long."),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <ScanLine className="mr-2 h-4 w-4" />
          Analyze Content
        </>
      )}
    </Button>
  );
}

export function QuickScanForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(handleTextScan, initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (state?.data) {
      setIsDialogOpen(true);
    }
  }, [state]);

  const onDialogClose = () => {
    setIsDialogOpen(false);
    form.reset();
  }

  return (
    <>
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="url">Website URL</TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-4">
          <Form {...form}>
            <form action={dispatch} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content to Analyze</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste any suspicious text, like an email or a text message..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {state?.errors?.content && (
                       <p className="text-sm font-medium text-destructive">{state.errors.content}</p>
                    )}
                  </FormItem>
                )}
              />
              <SubmitButton />
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="phone" className="mt-4 space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1-800-555-0199" />
          </div>
          <Button className="w-full" disabled><ScanLine className="mr-2 h-4 w-4" />Scan Number (soon)</Button>
        </TabsContent>
        <TabsContent value="email" className="mt-4 space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="winner@lotterymillions.net" />
          </div>
          <Button className="w-full" disabled><ScanLine className="mr-2 h-4 w-4" />Scan Email (soon)</Button>
        </TabsContent>
        <TabsContent value="url" className="mt-4 space-y-4">
          <div>
            <Label htmlFor="url">Website URL</Label>
            <Input id="url" type="url" placeholder="http://secure-login-bank.com" />
          </div>
          <Button className="w-full" disabled><ScanLine className="mr-2 h-4 w-4" />Scan URL (soon)</Button>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Analysis Result</DialogTitle>
            <DialogDescription>
              AI-powered analysis of the provided content.
            </DialogDescription>
          </DialogHeader>
          {state?.data && (
            <div className="space-y-4">
              <div>
                <Label>Scam Likelihood</Label>
                <div className="flex items-center gap-4 mt-1">
                  <Progress value={state.data.scamLikelihoodScore * 100} className="w-[60%]" />
                  <p className="font-bold text-lg">
                    {(state.data.scamLikelihoodScore * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <div>
                <Label>Rationale</Label>
                <p className="text-sm text-muted-foreground mt-1 bg-muted p-3 rounded-md border">
                  {state.data.rationale}
                </p>
              </div>
            </div>
          )}
           <Button onClick={onDialogClose} variant="outline">Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
