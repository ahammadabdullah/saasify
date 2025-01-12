"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Receipt,
  XCircle,
  ChevronDown,
  Download,
} from "lucide-react";

const invoicesData = [
  { id: "INV-2023-001", date: "Dec 1, 2023", amount: "$29.00", status: "Paid" },
  { id: "INV-2023-002", date: "Nov 1, 2023", amount: "$29.00", status: "Paid" },
  { id: "INV-2023-003", date: "Oct 1, 2023", amount: "$29.00", status: "Paid" },
];

export function SubscriptionCard() {
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Settings</CardTitle>
        <CardDescription>
          Manage your subscription and billing preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-muted-foreground">
                500 requests per month
              </p>
            </div>
            <Button>Upgrade to Pro</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <CreditCard className="h-5 w-5" />
            <div className="flex-1">
              <p className="font-medium">Billing Account</p>
              <p className="text-sm text-muted-foreground">
                Manage your billing information
              </p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>

          <Separator />

          <Collapsible open={isInvoicesOpen} onOpenChange={setIsInvoicesOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0">
                <div className="flex items-center gap-4">
                  <Receipt className="h-5 w-5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">Invoices</p>
                    <p className="text-sm text-muted-foreground">
                      View your past invoices
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isInvoicesOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          <div className="flex items-center gap-4">
            <XCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium">Cancel Subscription</p>
              <p className="text-sm text-muted-foreground">
                End your subscription
              </p>
            </div>
            <Button variant="destructive">Cancel</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
