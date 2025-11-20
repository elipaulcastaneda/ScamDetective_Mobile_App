"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, Mail, Phone, ChevronDown } from "lucide-react";

const scanHistory = [
  {
    id: "1",
    type: "Text",
    content: "URGENT: Your account is locked. Click here to verify...",
    fullContent: "URGENT: Your account is locked. Click here to verify your identity immediately or your account will be permanently suspended. We detected unusual activity from your IP address 192.168.1.1. Visit http://secure-verify-account.com/login to restore access within 24 hours.",
    origin: "SMS from +1-555-0123",
    risk: 0.95,
    date: "2024-07-21",
    result: "High Risk",
    threatType: "Phishing",
  },
  {
    id: "2",
    type: "URL",
    content: "http://secure-login-bank.com",
    fullContent: "http://secure-login-bank.com/verify?user=12345&token=abc123xyz",
    origin: "Email from security@bank-alerts.net",
    risk: 0.88,
    date: "2024-07-20",
    result: "High Risk",
    threatType: "Phishing",
  },
  {
    id: "3",
    type: "Email",
    content: "winner@lotterymillions.net",
    fullContent: "Congratulations! You've won $10,000,000 in our international lottery. To claim your prize, please send your personal details and a processing fee of $500 to winner@lotterymillions.net. This offer expires in 48 hours!",
    origin: "Email from notifications@lottery-prize.com",
    risk: 0.76,
    date: "2024-07-20",
    result: "Medium Risk",
    threatType: "Spam",
  },
  {
    id: "4",
    type: "Phone",
    content: "+1-800-555-0199",
    fullContent: "+1-800-555-0199 (Caller ID: IRS Official)",
    origin: "Incoming call",
    risk: 0.21,
    date: "2024-07-19",
    result: "Low Risk",
    threatType: "None",
  },
  {
    id: "5",
    type: "URL",
    content: "https://google.com",
    fullContent: "https://google.com/search?q=scam+detection",
    origin: "Browser navigation",
    risk: 0.01,
    date: "2024-07-18",
    result: "Safe",
    threatType: "None",
  },
  {
    id: "6",
    type: "Text",
    content: "Hey, are you free this weekend? Let's catch up.",
    fullContent: "Hey, are you free this weekend? Let's catch up at the coffee shop on Main Street. I heard they have great pastries!",
    origin: "SMS from John (Contact)",
    risk: 0.02,
    date: "2024-07-17",
    result: "Safe",
    threatType: "None",
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
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  
  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan History</CardTitle>
        <CardDescription>
          A log of all your past scans and their results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile: Card-based layout */}
        <div className="space-y-4 md:hidden">
          <TooltipProvider>
            {scanHistory.map((scan) => {
              const isExpanded = expandedIds.has(scan.id);
              return (
                <Card key={scan.id} className="overflow-hidden">
                  <CardContent className="p-4 space-y-3">
                    {/* Risk Level Badge - Most Prominent */}
                    <div className="flex items-center justify-between">
                      <Badge variant={getRiskBadgeVariant(scan.result)} className="text-sm px-3 py-1">
                        {scan.result}
                      </Badge>
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
                    </div>
                    
                    {/* Threat Type - Second Most Prominent */}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{scan.threatType}</p>
                    </div>
                    
                    {/* Risk Percentage - Third Most Prominent */}
                    <div>
                      <p className="text-lg font-bold text-foreground">{(scan.risk * 100).toFixed(0)}% Risk</p>
                    </div>
                    
                    {/* Content with Origin - Fourth */}
                    <div className="pt-2 border-t space-y-2">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Origin:</p>
                        <p className="text-sm text-foreground">{scan.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Content:</p>
                        {isExpanded ? (
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm text-foreground break-all whitespace-pre-wrap">{scan.fullContent}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground break-all line-clamp-2">{scan.content}</p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-xs h-8"
                        onClick={() => toggleExpanded(scan.id)}
                      >
                        {isExpanded ? 'See Less' : 'See More'} 
                        <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>
                    
                    {/* Date - Least Prominent */}
                    <div>
                      <p className="text-xs text-muted-foreground">{scan.date}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TooltipProvider>
        </div>

        {/* Desktop: Table layout */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead className="min-w-[200px]">Content</TableHead>
                <TableHead>Threat Type</TableHead>
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
                    <TableCell className="font-medium">
                      <div className="max-w-[300px] truncate">{scan.content}</div>
                    </TableCell>
                    <TableCell>{scan.threatType}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">{(scan.risk * 100).toFixed(0)}%</TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      <Badge variant={getRiskBadgeVariant(scan.result)}>
                        {scan.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{scan.date}</TableCell>
                  </TableRow>
                ))}
              </TooltipProvider>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
