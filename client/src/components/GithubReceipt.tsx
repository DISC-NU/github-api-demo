import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { GitHubStats } from "@/lib/types";
import { Barcode } from "lucide-react";

interface GitHubReceiptProps {
  data: GitHubStats;
}

export default function GitHubReceipt({ data }: GitHubReceiptProps) {
  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const orderNumber = Math.floor(Math.random() * 10000);

  return (
    <Card className="w-[380px] font-mono bg-white text-black shadow-lg">
      <CardHeader className="text-center space-y-2 pb-2 border-b border-dashed">
        <h1 className="text-2xl font-bold tracking-tight">GITHUB RECEIPT</h1>
        <p className="text-sm">{currentDate}</p>
        <p className="text-sm">ORDER #{orderNumber}</p>
      </CardHeader>
      <CardContent className="space-y-8 py-6">
        <div className="space-y-1">
          <p>CUSTOMER: {data.username}</p>
          <p>@{data.username}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>REPOSITORIES</span>
            <span>{data.repositories}</span>
          </div>
          <div className="flex justify-between">
            <span>STARS EARNED</span>
            <span>{data.stars}</span>
          </div>
          <div className="flex justify-between">
            <span>REPO FORKS</span>
            <span>{data.forks}</span>
          </div>
          <div className="flex justify-between">
            <span>FOLLOWERS</span>
            <span>{data.followers}</span>
          </div>
          <div className="flex justify-between">
            <span>FOLLOWING</span>
            <span>{data.following}</span>
          </div>
        </div>

        <div className="space-y-1">
          <p>TOP LANGUAGES:</p>
          <p className="text-sm">
            {data.topLanguages.join(", ") || "No languages found"}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>MOST ACTIVE DAY:</span>
            <span>Monday</span>
          </div>
          <div className="flex justify-between">
            <span>COMMITS (30d):</span>
            <span>134</span>
          </div>
          <div className="flex justify-between">
            <span>CONTRIBUTION SCORE:</span>
            <span>60</span>
          </div>
        </div>

        <div className="text-center space-y-1">
          <p>Served by: Alan Turing</p>
          <p>{currentTime}</p>
        </div>

        <div className="text-center space-y-1">
          <p>
            COUPON CODE: {Math.random().toString(36).substr(2, 6).toUpperCase()}
          </p>
          <p className="text-sm">Save for your next commit!</p>
        </div>

        <div className="space-y-1 text-sm">
          <p>CARD #: **** **** **** {new Date().getFullYear()}</p>
          <p>
            AUTH CODE:{" "}
            {Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}
          </p>
          <p>CARDHOLDER: {data.username.toUpperCase()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-center space-y-4 pt-2 border-t border-dashed">
        <p className="font-bold">THANK YOU FOR CODING!</p>
        <div className="w-full flex justify-center">
          <Barcode className="w-48 h-12" />
        </div>
        <p className="text-sm">github.com/{data.username}</p>
      </CardFooter>
    </Card>
  );
}
