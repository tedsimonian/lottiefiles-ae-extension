import { useState } from "react";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Download, Heart, Loader2 } from "lucide-react";

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
import { cn, getReadableTextColor } from "../../../shared/utils";

type LottieCardProps = {
  animation: ArrayItem<
    FeaturedPublicAnimationsQuery["featuredPublicAnimations"]["edges"]
  >;
};

const LottieCard: React.FC<LottieCardProps> = ({ animation }) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  return (
    <Card
      className="w-full h-[320px] flex flex-col transition-shadow hover:shadow-lg overflow-hidden"
      style={{ backgroundColor: animation.node.bgColor || "white" }}
    >
      <CardHeader className="p-4 flex-grow justify-center">
        {animation.node.lottieUrl && (
          <div className="flex justify-center items-center">
            <DotLottieReact
              src={animation.node.lottieUrl}
              loop
              autoplay
              dotLottieRefCallback={dotLottieRefCallback}
              style={{ maxWidth: "450px" }}
            />
            {!dotLottie && <Loader2 className="h-8 w-8 animate-spin" />}
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
          <a
            href={animation.node.url ?? "#"}
            target="_blank"
            className="hover:underline"
          >
            {animation.node.name}
          </a>
        </CardTitle>
      </CardContent>
      <CardFooter
        className={cn(
          "p-4 pt-0 flex justify-between mt-auto items-start flex-wrap",
          getReadableTextColor(animation.node.bgColor || "white")
        )}
      >
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={animation.node.createdBy?.avatarUrl}
              alt={animation.node.createdBy?.username}
            />
            <AvatarFallback>
              {animation.node.createdBy?.username}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "text-sm",
              getReadableTextColor(animation.node.bgColor || "white")
            )}
          >
            {animation.node.createdBy?.username}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span className="text-sm">{animation.node.downloads}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{animation.node.likesCount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LottieCard;
