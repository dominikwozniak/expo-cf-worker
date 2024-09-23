import type { FlashList, ViewToken } from "@shopify/flash-list";
import { useCallback, useRef, useState } from "react";

export function useListSlideControl<T>(data: readonly T[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlashList<T>>(null);

  const handleViewableItemsChanged = useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      setCurrentIndex(viewableItems[0]?.index ?? 0);
    },
    [],
  );

  const handlePrevSlide = () => {
    if (currentIndex === 0) {
      return;
    }

    listRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex - 1,
    });
  };

  const handleNextSlide = () => {
    if (currentIndex === data.length - 1) {
      return;
    }

    listRef.current?.scrollToIndex({
      animated: true,
      index: currentIndex + 1,
    });
  };

  return {
    listRef,
    currentIndex,
    handleViewableItemsChanged,
    handlePrevSlide,
    handleNextSlide,
  };
}
