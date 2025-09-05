import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ReportPage() {
  return (
    <div className="flex justify-center items-start pt-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Report a Suspected Scam</CardTitle>
          <CardDescription>
            Help protect the community by reporting suspicious activity. Your
            report will be analyzed and may be added to our database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="scam-type">Type of Scam</Label>
              <Select>
                <SelectTrigger id="scam-type">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phishing-url">Phishing Website</SelectItem>
                  <SelectItem value="scam-email">Scam Email</SelectItem>
                  <SelectItem value="scam-phone">Scam Phone Number</SelectItem>
                  <SelectItem value="malicious-text">Malicious Text</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="scam-content">
                Content (URL, email, phone number, etc.)
              </Label>
              <Input
                id="scam-content"
                placeholder="e.g., http://your-bank-security.com"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide any additional details about the suspected scam..."
                rows={5}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="evidence">Attach Evidence (Optional)</Label>
              <Input id="evidence" type="file" />
              <p className="text-sm text-muted-foreground">
                You can attach screenshots or text files.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit Report</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
