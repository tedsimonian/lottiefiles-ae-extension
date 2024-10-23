import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader2 } from "lucide-react";

import LottieCard from "./lottie-card";
import { Button } from "./ui/button";

import { FEATURED_PUBLIC_ANIMATIONS } from "../../lib/graphql/queries";

const QUERY_FETCH_LIMIT = 12;

const LottieAnimationGrid: React.FC = () => {
  const [hasNextPage, setHasNextPage] = useState(true);

  const { loading, error, data, fetchMore } = useQuery(
    FEATURED_PUBLIC_ANIMATIONS,
    {
      variables: {
        first: QUERY_FETCH_LIMIT,
        orderBy: { field: "DOWNLOADS", direction: "DESC" },
      },
    }
  );

  const pageInfo = data?.featuredPublicAnimations?.pageInfo;

  const loadMore = () => {
    if (!hasNextPage) return;

    fetchMore({
      variables: {
        first: QUERY_FETCH_LIMIT,
        after: data?.featuredPublicAnimations.pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        const { edges: newEdges, pageInfo } =
          fetchMoreResult.featuredPublicAnimations;

        setHasNextPage(pageInfo.hasNextPage);

        return {
          featuredPublicAnimations: {
            __typename: prevResult.featuredPublicAnimations.__typename,
            edges: [...prevResult.featuredPublicAnimations.edges, ...newEdges],
            pageInfo,
            totalCount: fetchMoreResult.featuredPublicAnimations.totalCount,
          },
        };
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data &&
          data.featuredPublicAnimations.edges.map((edge, index) => (
            <LottieCard key={`${edge.cursor}-${index}`} animation={edge} />
          ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center mt-8">
          <p>Error: {error.message}</p>
        </div>
      )}
      {!loading && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMore} disabled={!hasNextPage}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default LottieAnimationGrid;
