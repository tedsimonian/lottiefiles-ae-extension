import React from "react";
import {
  useQuery,
  OperationVariables,
  TypedDocumentNode,
  QueryHookOptions,
  QueryResult,
} from "@apollo/client";
import { Loader2 } from "lucide-react";

type QueryResultProps<TQuery> = QueryResult<TQuery> & {
  data: TQuery;
};

type QueryComponentProps<TQuery> = {
  query: TypedDocumentNode<TQuery>;
  variables?: OperationVariables;
  options?: QueryHookOptions<TQuery, OperationVariables>;
  children: (result: QueryResultProps<TQuery>) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error) => React.ReactNode;
};

// Maybe I can use this later, but currently I don't need it

export const Query = <TQuery,>({
  query,
  variables,
  children,
  loadingComponent,
  errorComponent,
}: QueryComponentProps<TQuery>) => {
  const result = useQuery(query, {
    variables,
  });

  if (result.loading) {
    return (
      loadingComponent || (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    );
  }

  if (result.error) {
    return errorComponent ? (
      errorComponent(result.error)
    ) : (
      <div className="flex justify-center items-center p-4">
        <p className="text-destructive">Error: {result.error.message}</p>
      </div>
    );
  }

  if (!result.data) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return <>{children(result as QueryResultProps<TQuery>)}</>;
};

export default Query;
