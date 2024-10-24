import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader2 } from "lucide-react";

import { FEATURED_PUBLIC_ANIMATIONS } from "../../lib/graphql/queries";

import { LottieAnimationGrid } from "./lottie-card-grid";
import { Button } from "../../../shared/components/ui/button";
import { EmptyData } from "../../../shared/components/empty-data";

const QUERY_FETCH_LIMIT = 12;

export const FeaturedAnimations: React.FC = () => {
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // I should probably sort this by downloads or likeCounts based on future requirements
  const { loading, error, data, fetchMore } = useQuery(
    FEATURED_PUBLIC_ANIMATIONS,
    {
      variables: {
        first: QUERY_FETCH_LIMIT,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const loadMore = () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);

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
    }).finally(() => {
      setIsLoadingMore(false);
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Featured Lottie Animations</h1>

      {/* In the case there is no data, we want to show the empty data component, but only if the data is not loading still */}
      {data && <LottieAnimationGrid data={data} />}
      {!data && !loading && (
        <EmptyData message="No featured animations found" />
      )}
      {loading && !isLoadingMore && (
        <div className="flex justify-center items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          Loading Featured Animations...
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center mt-8">
          <p>Error: {error.message}</p>
        </div>
      )}
      {/* We do not want the button to be displayed if the data is loading, looks weird */}
      {!loading && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMore}
            disabled={!hasNextPage || isLoadingMore}
            className="min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            size="lg"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeaturedAnimations;
