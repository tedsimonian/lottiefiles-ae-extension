import React from "react";

import LottieCardGrid from "./lottie-card-grid";

const FeaturedAnimations: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Lottie Animations</h1>
      <LottieCardGrid />
    </div>
  );
};

export default FeaturedAnimations;
