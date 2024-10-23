import { gql } from "@apollo/client";

export const FEATURED_PUBLIC_ANIMATIONS = gql`
  query FeaturedPublicAnimations {
    featuredPublicAnimations {
      edges {
        cursor
        node {
          bgColor
          gifUrl
          description
          downloads
          lottieUrl
          name
        }
      }
    }
  }
`;
