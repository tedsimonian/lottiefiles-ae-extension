import { LottieCard } from "./lottie-card";
import { FeaturedPublicAnimationsQuery } from "../../lib/__generated__/graphql";

type LottieAnimationGridProps = {
  data: FeaturedPublicAnimationsQuery;
};

export const LottieAnimationGrid = ({ data }: LottieAnimationGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.featuredPublicAnimations.edges.map((edge, index) => (
        <LottieCard key={edge.cursor} animation={edge} />
      ))}
    </div>
  );
};

export default LottieAnimationGrid;
