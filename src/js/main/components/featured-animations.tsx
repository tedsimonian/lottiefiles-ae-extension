import React from "react";
import { useQuery } from "@apollo/client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { FEATURED_PUBLIC_ANIMATIONS } from "../../lib/graphql/queries";

const FeaturedAnimations: React.FC = () => {
  const { loading, error, data } = useQuery(FEATURED_PUBLIC_ANIMATIONS, {
    variables: {
      first: 10,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.featuredPublicAnimations.edges.map((edge) => (
        <div key={edge.cursor} className="bg-white p-4 shadow-lg rounded-md">
          <h3 className="text-lg font-bold">{edge.node.name}</h3>
          {edge.node.lottieUrl && (
            <DotLottieReact src={edge.node.lottieUrl} loop autoplay />
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturedAnimations;
