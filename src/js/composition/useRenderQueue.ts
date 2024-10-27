import { useState, useCallback, useRef, useEffect } from "react";
import { ClientComposition } from "../types";

export type RenderQueueItem = {
  _id: string;
  item: ClientComposition;
  status: "pending" | "processing" | "completed";
};

export function useRenderQueue(
  renderFunction: (item: ClientComposition) => Promise<void>
) {
  const [queue, setQueue] = useState<RenderQueueItem[]>([]);
  const [processedItems, setProcessedItems] = useState<RenderQueueItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
    const processQueue = async () => {
      if (queue.length > 0) {
        if (!isProcessing) {
          setIsProcessing(true);
          const currentItem = queue[0];

          try {
            // Update item status to processing
            setQueue((prevQueue) => [
              { ...currentItem, status: "processing" },
              ...prevQueue.slice(1),
            ]);

            // Add a delay to simulate rendering time, this is totally unnecessary, but it is to demonstrate the queue
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Render the item
            await renderFunction(currentItem.item);

            // Update item status to completed
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
    processedItems,
  };
}
