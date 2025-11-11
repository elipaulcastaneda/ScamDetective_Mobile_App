"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleTextScanClient, type State } from "@/lib/clientActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

function SubmitButton({loading}:{loading:boolean}) {
  return (
    <Button type="submit" disabled={loading} className="w-full">
      {loading ? (
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
  const initialState: State = { message: null, errors: {}, data: null };
  const [state, setState] = useState<State>(initialState);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (!state.data) {
      form.reset();
    }
  }, [state.data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setState({ message: null, errors: {}, data: null });
    try {
      const res = await handleTextScanClient(values.content);
      setState(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Scan</CardTitle>
          <CardDescription>Analyze text, phone numbers, emails, or websites for potential scams.</CardDescription>
        </CardHeader>
        <CardContent>
           <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="url">Website URL</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <SubmitButton loading={loading} />
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
        </CardContent>
      </Card>

      {state?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
            <CardDescription>
              AI-powered analysis of the provided content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Scam Classification</Label>
              <p className="text-sm mt-1">
                {state.data.predicted_class === 1 ? (
                  <span className="font-semibold text-destructive">⚠️ Likely Scam</span>
                ) : (
                  <span className="font-semibold text-green-600">✓ Likely Safe</span>
                )}
              </p>
            </div>
            <div>
              <Label>Confidence</Label>
              <div className="flex items-center gap-4 mt-1">
                <Progress value={state.data.probability * 100} className="w-[60%]" />
                <p className="font-bold text-lg">
                  {(state.data.probability * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            {state.message && (
              <div>
                <Label>Status</Label>
                <p className="text-sm text-muted-foreground mt-1 bg-muted p-3 rounded-md border">
                  {state.message}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
