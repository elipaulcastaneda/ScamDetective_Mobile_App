import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText, Link as LinkIcon, Mail, Phone } from "lucide-react";

const scanHistory = [
  {
    id: "1",
    type: "Text",
    content: "URGENT: Your account is locked. Click here to verify...",
    risk: 0.95,
    date: "2024-07-21",
    result: "High Risk",
  },
  {
    id: "2",
    type: "URL",
    content: "http://secure-login-bank.com",
    risk: 0.88,
    date: "2024-07-20",
    result: "High Risk",
  },
  {
    id: "3",
    type: "Email",
    content: "winner@lotterymillions.net",
    risk: 0.76,
    date: "2024-07-20",
    result: "Medium Risk",
  },
  {
    id: "4",
    type: "Phone",
    content: "+1-800-555-0199",
    risk: 0.21,
    date: "2024-07-19",
    result: "Low Risk",
  },
  {
    id: "5",
    type: "URL",
    content: "https://google.com",
    risk: 0.01,
    date: "2024-07-18",
    result: "Safe",
  },
    {
    id: "6",
    type: "Text",
    content: "Hey, are you free this weekend? Let's catch up.",
    risk: 0.02,
    date: "2024-07-17",
    result: "Safe",
  },
];

const getRiskBadgeVariant = (result: string) => {
  switch (result) {
    case "High Risk":
      return "destructive";
    case "Medium Risk":
      return "secondary";
    default:
      return "default";
  }
};

const typeIcons = {
  Text: <FileText className="h-4 w-4" />,
  URL: <LinkIcon className="h-4 w-4" />,
  Email: <Mail className="h-4 w-4" />,
  Phone: <Phone className="h-4 w-4" />,
};

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
        <CardDescription>
          A log of all your past scans and their results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Type</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="text-right">Risk</TableHead>
              <TableHead className="text-center">Result</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TooltipProvider>
              {scanHistory.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center">
                          {typeIcons[scan.type as keyof typeof typeIcons]}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{scan.type}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-medium truncate max-w-xs">{scan.content}</TableCell>
                  <TableCell className="text-right">{(scan.risk * 100).toFixed(0)}%</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getRiskBadgeVariant(scan.result)}>
                      {scan.result}
                    </Badge>
                  </TableCell>
                  <TableCell>{scan.date}</TableCell>
                </TableRow>
              ))}
            </TooltipProvider>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
