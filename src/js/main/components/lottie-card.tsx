import { useState } from "react";
import {
  Player,
  Controls,
  PlayerEvent,
} from "@lottiefiles/react-lottie-player";
import { Check, Copy, Download, Heart, Loader2 } from "lucide-react";
import { useQuery } from "react-query";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../shared/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../shared/components/ui/avatar";

import { FeaturedPublicAnimationsQuery } from "../../lib/__generated__/graphql";
import { ArrayItem } from "../../types";
import {
  cn,
  copyToClipboard,
  getReadableTextColor,
} from "../../../shared/utils";
import { Button } from "../../../shared/components/ui/button";

type LottieCardProps = {
  animation: ArrayItem<
    FeaturedPublicAnimationsQuery["featuredPublicAnimations"]["edges"]
  >;
};

const fetchLottieJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Lottie JSON");
  }
  return response.json();
};

export const LottieCard: React.FC<LottieCardProps> = ({ animation }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: lottieJson } = useQuery({
    queryKey: ["lottieJson", animation.node.jsonUrl],
    queryFn: () => fetchLottieJson(animation.node.jsonUrl ?? ""),
    enabled: !!animation.node.jsonUrl, // don't fetch if no url is available
    cacheTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  /**
   * The Clipboard API functionality is not supported in Adobe CEP, we are using a deprecated method to copy the JSON to the clipboard.
   * It will require further investigation, as to why the clipboard API does not work in Adobe CEP.
   */
  const handleClipboardCopy = async () => {
    copyToClipboard(JSON.stringify(lottieJson, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card
      className="w-full h-full flex flex-col transition-shadow hover:shadow-lg overflow-hidden"
      style={{ backgroundColor: animation.node.bgColor || "white" }}
    >
      <CardHeader className="p-4 flex-grow justify-center">
        {animation.node.jsonUrl && (
          <div className="flex justify-center items-center">
            <Player
              onEvent={(event) => {
                if (event === PlayerEvent.Load) {
                  setLoading(false);
                }
              }}
              src={animation.node.jsonUrl}
              style={{ height: "150px" }}
            >
              <Controls
                visible={true}
                buttons={["play", "frame"]}
                transparentTheme={true}
              />
            </Player>
            {loading && <Loader2 className="h-8 w-8 animate-spin" />}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <CardTitle
          className={cn(
            "text-lg mb-2",
            getReadableTextColor(animation.node.bgColor || "white")
          )}
        >
          {animation.node.name}
        </CardTitle>
      </CardContent>
      <CardFooter
        className={cn(
          "p-4 pt-0 flex justify-between mt-auto items-start flex-wrap "
        )}
      >
        <div
          className={cn(
            "flex items-center space-x-2 mb-2",
            getReadableTextColor(animation.node.bgColor || "white")
          )}
        >
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={animation.node.createdBy?.avatarUrl}
              alt={animation.node.createdBy?.username}
            />
            <AvatarFallback>
              {animation.node.createdBy?.username}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{animation.node.createdBy?.username}</span>
        </div>
        <div className="flex items-center space-x-2 justify-between w-full">
          <div
            className={cn(
              "flex items-center space-x-2",
              getReadableTextColor(animation.node.bgColor || "white")
            )}
          >
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span className="text-sm">{animation.node.downloads}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{animation.node.likesCount}</span>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={handleClipboardCopy}>
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LottieCard;
