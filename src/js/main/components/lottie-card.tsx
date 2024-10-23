import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Card, CardContent } from "./ui/card";

import { FeaturedPublicAnimationsQuery } from "../../lib/__generated__/graphql";
import { ArrayItem } from "../../types";

type LottieCardProps = {
  animation: ArrayItem<
    FeaturedPublicAnimationsQuery["featuredPublicAnimations"]["edges"]
  >;
};

const LottieCard: React.FC<LottieCardProps> = ({ animation }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full h-64 cursor-pointer transition-shadow hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        {animation.node.lottieUrl && (
          <DotLottieReact
            src={animation.node.lottieUrl}
            loop
            autoplay={isHovered}
            style={{ height: 200, width: 200 }}
          />
        )}
        <h3 className="text-lg font-semibold mt-2">{animation.node.name}</h3>
      </CardContent>
    </Card>
  );
};

export default LottieCard;
