import { render, screen } from "@testing-library/react";
import { QueryClientProvider } from "react-query";

import { CompositionPanel } from "../composition-panel";
import { queryClient } from "../../lib/utils/reactQueryClient";

// Mock the evalTS function
jest.mock("../../lib/utils/bolt", () => ({
  evalTS: jest.fn().mockResolvedValue([]),
}));

describe("CompositionPanel", () => {
  it("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CompositionPanel />
      </QueryClientProvider>
    );

    expect(screen.getByText("Compositions")).toBeInTheDocument();
  });

  it('displays "No compositions found" when there are no compositions', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CompositionPanel />
      </QueryClientProvider>
    );

    expect(screen.getByText("No compositions found")).toBeInTheDocument();
  });
});
