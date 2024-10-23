import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.lottiefiles.com/2022-08/graphiql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "src/js/lib/__generated__": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
