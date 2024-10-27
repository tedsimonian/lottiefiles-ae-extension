import { useState, useCallback, useRef, useEffect } from "react";
import { ClientComposition } from "../types";

export type RenderQueueItem = {
  _id: string;
  item: ClientComposition;
  status: "pending" | "processing" | "completed";
};

/**
 * A hook to render a queue of compositions.
 * @param renderFunction - A function that renders a composition.
 * @returns An object containing the queue, processed items, and processing state.
 */
export function useRenderQueue(
  renderFunction: (item: ClientComposition) => Promise<void>
) {
  const [queue, setQueue] = useState<RenderQueueItem[]>([]);
  const [processedItems, setProcessedItems] = useState<RenderQueueItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Add items to the queue. Appends a status for each item.
   * @param items - The items to add to the queue.
   */
  const addToQueue = useCallback((items: ClientComposition[]) => {
    setQueue((prevQueue) => [
      ...prevQueue,
      ...items.map((item) => ({
        _id: item.id.toString(),
        item,
        status: "pending" as const,
      })),
    ]);
  }, []);

  useEffect(() => {
    /**
     * Process the queue of compositions.
     *
     * 1. Get the first item in the queue
     * 2. Set the item to processing, update the queue with the new status
     * 3. Add a small delay to simulate rendering time
     * 4. call the render function
     * 5. Set the item to completed
     * 6. Remove the item from the queue
     * 7. Add the item to the processed items
     *
     * If at any point an item fails to render, we pop it out of the queue
     * to stop infinite loops
     */
    const processQueue = async () => {
      if (queue.length > 0) {
        if (!isProcessing) {
          setIsProcessing(true);
          const currentItem = queue[0];

          try {
            setQueue((prevQueue) => [
              { ...currentItem, status: "processing" },
              ...prevQueue.slice(1),
            ]);

            // Add a delay to simulate rendering time, this is totally unnecessary, but it is to demonstrate the queue
            await new Promise((resolve) => setTimeout(resolve, 1000));

            await renderFunction(currentItem.item);

            const completedItem = {
              ...currentItem,
              status: "completed" as const,
            };

            // Remove item from queue and add to processed items
            setQueue((prevQueue) => prevQueue.slice(1));
            setProcessedItems((prevProcessed) => [
              ...prevProcessed,
              completedItem,
            ]);
          } catch (error) {
            console.error(`Error processing item ${currentItem._id}:`, error);
            setQueue((prevQueue) =>
              prevQueue.filter((q) => q._id !== currentItem._id)
            );
          } finally {
            setIsProcessing(false);
          }
        }
      }
    };
    processQueue();
  }, [queue]);

  return {
    addToQueue,
    queue,
    isProcessing,
    processedItems, // Passing this just for debugging purposes, but might be useful
  };
}
