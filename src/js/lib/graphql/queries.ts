import { gql } from "../__generated__";

export const FEATURED_PUBLIC_ANIMATIONS = gql(`
  query FeaturedPublicAnimations($after: String, $before: String, $first: Int, $last: Int, $orderBy: QuerySortOptions, $filters: AnimationFilter) {
    featuredPublicAnimations(after: $after, before: $before, first: $first, last: $last, orderBy: $orderBy, filters: $filters) {
      edges {
        cursor
        node {
          bgColor
          gifUrl
          description
          downloads
          lottieUrl
          name
          likesCount
          isLiked
          createdBy {
            avatarUrl
            username
            firstName
            lastName
       }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`);
