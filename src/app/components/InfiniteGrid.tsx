import { type ReactElement, cloneElement } from "react";
import { useMedia } from "react-use";
import {
  GridItemContent,
  VirtuosoGrid,
  VirtuosoGridProps,
} from "react-virtuoso";
import debounce from "lodash/debounce";

import { Box } from "@radix-ui/themes";
import { getBreakpointQuery } from "@/app/utils";

import breakpoints from "@/styles/breakpoints";

type InfiniteScrollGridProps<Item> = {
  items: Item[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  children?: GridItemContent<Item, unknown>;
  virtuosoProps?: VirtuosoGridProps<Item>;
};

const LoadMoreItems = ({ children }: { children: ReactElement }) => {
  const isXsScreen = useMedia(getBreakpointQuery(breakpoints.up("xs")), false);
  const isSmScreen = useMedia(getBreakpointQuery(breakpoints.up("sm")), false);
  const isMdScreen = useMedia(getBreakpointQuery(breakpoints.up("md")), false);
  const isLgScreen = useMedia(getBreakpointQuery(breakpoints.up("lg")), false);
  let skeletonCount = 2;

  if (isLgScreen) {
    skeletonCount = 4;
  } else if (isMdScreen) {
    skeletonCount = 4;
  } else if (isSmScreen) {
    skeletonCount = 2;
  } else if (isXsScreen) {
    skeletonCount = 3;
  }

  return (
    <Box
      as="div"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(10.125rem) minmax(10.125rem)",
        justifyItems: "center",
        gap: "0.5rem",
        height: "240px",
      }}
      gridColumn={skeletonCount + ""}
    >
      {Array.from({ length: skeletonCount }, (_, i) => `${i}`).map((key) =>
        cloneElement(children, { key })
      )}
    </Box>
  );
};

const InfiniteGrid = <Item,>({
  items,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  virtuosoProps,
  children,
}: InfiniteScrollGridProps<Item>) => {
  const handleFetchNext = debounce(fetchNextPage, 200);
  return (
    <VirtuosoGrid
      useWindowScroll
      style={{
        height: "calc(100% - 300px)",
        // height: "100%",
      }}
      data={items}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          handleFetchNext();
        }
      }}
      itemContent={children}
      {...virtuosoProps}
    />
  );
};

InfiniteGrid.LoadMore = LoadMoreItems;

export default InfiniteGrid;
