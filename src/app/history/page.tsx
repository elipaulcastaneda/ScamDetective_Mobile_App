"use client";

import { useState, useEffect } from "react";
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
import { FileText, Link as LinkIcon, Mail, Phone, ChevronDown, ScanLine } from "lucide-react";
import { getScanHistory, clearScanHistory, type ScanHistoryItem } from "@/lib/scanHistory";

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
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [filterRange, setFilterRange] = useState<"24h" | "7d" | "30d" | "365d" | "all">("all");
  
  // Load scan history from local storage
  useEffect(() => {
    setScanHistory(getScanHistory());
    
    // Listen for updates
    const handleUpdate = () => {
      setScanHistory(getScanHistory());
    };
    
    window.addEventListener("scanHistoryUpdated", handleUpdate);
    return () => window.removeEventListener("scanHistoryUpdated", handleUpdate);
  }, []);

  const filteredHistory = scanHistory.filter((item) => {
    if (filterRange === "all") return true;
    const now = Date.now();
    const createdAt = item.createdAt ?? Date.parse(item.date);
    if (Number.isNaN(createdAt)) return true;

    const ranges = {
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
      "365d": 365 * 24 * 60 * 60 * 1000,
    } as const;

    return now - createdAt <= ranges[filterRange];
  });

  const handleClear = () => {
    clearScanHistory();
    setExpandedIds(new Set());
    setScanHistory([]);
  };
  
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
        <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {[{label:"24h", value:"24h"},{label:"Last week", value:"7d"},{label:"Last month", value:"30d"},{label:"Last year", value:"365d"},{label:"All", value:"all"}].map(({label, value}) => (
              <Button
                key={value}
                size="sm"
                variant={filterRange === value ? "default" : "outline"}
                onClick={() => setFilterRange(value as typeof filterRange)}
              >
                {label}
              </Button>
            ))}
          </div>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleClear}
          >
            Delete All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <ScanLine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Scan History Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your scan results will appear here after you analyze content in the Quick Scan tab.
            </p>
            <p className="text-xs text-muted-foreground">
              All data is stored locally on your device for privacy.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile: Card-based layout */}
            <div className="space-y-4 md:hidden">
          <TooltipProvider>
              {filteredHistory.map((scan) => {
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
                {filteredHistory.map((scan) => (
                  <TableRow key={scan.id} className="align-top">
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
