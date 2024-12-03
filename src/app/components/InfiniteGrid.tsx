import { type ReactElement, cloneElement } from "react";
import { useMedia } from "react-use";
import {
  GridItemContent,
  VirtuosoGrid,
  VirtuosoGridProps,
} from "react-virtuoso";
import debounce from "lodash/debounce";

import { cn, getBreakpointQuery } from "@/app/utils";

import breakpoints from "@/styles/breakpoints";

type InfiniteScrollGridProps<Item> = {
  items: Item[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  children?: GridItemContent<Item, unknown>;
  virtuosoProps?: VirtuosoGridProps<Item>;
};

const responsiveCols =
  "xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-3";

const LoadMoreItems = ({ children }: { children: ReactElement }) => {
  const isXsScreen = useMedia(getBreakpointQuery(breakpoints.up("xs")), false);
  const isSmScreen = useMedia(getBreakpointQuery(breakpoints.up("sm")), false);
  const isMdScreen = useMedia(getBreakpointQuery(breakpoints.up("md")), false);
  const isLgScreen = useMedia(getBreakpointQuery(breakpoints.up("lg")), false);
  let skeletonCount = 2;

  if (isLgScreen) {
    skeletonCount = 5;
  } else if (isMdScreen) {
    skeletonCount = 5;
  } else if (isSmScreen) {
    skeletonCount = 4;
  } else if (isXsScreen) {
    skeletonCount = 3;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(10.125rem,_1fr)_minmax(10.125rem,_1fr)] justify-items-center xs:justify-item-start gap-2 xs:gap-4 h-[345px]",
        responsiveCols
      )}
    >
      {Array.from({ length: skeletonCount }, (_, i) => `${i}`).map((key) =>
        cloneElement(children, { key })
      )}
    </div>
  );
};

const InfiniteGrid = <Item,>({
  items,
  fetchNextPage,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  virtuosoProps,
  children,
}: InfiniteScrollGridProps<Item>) => {
  const handleFetchNext = debounce(fetchNextPage, 200);
  const isXXsScreen = useMedia(
    getBreakpointQuery("@media (max-width: 375px)"),
    false
  );

  if (isLoading) {
    return <div className="min-h-[calc(100vh-270px)]">loading</div>;
  }

  return (
    <VirtuosoGrid
      useWindowScroll
      style={{ height: "calc(100% - 300px)", width: "100%" }}
      data={items}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          handleFetchNext();
        }
      }}
      listClassName={cn(
        "grid grid-cols-[minmax(10.125rem,_1fr)_minmax(10.125rem,_1fr)] justify-items-center xs:justify-item-start h-fit",
        isXXsScreen ? "gap-[0.625rem]" : "gap-4",
        responsiveCols
      )}
      itemClassName="w-full h-full"
      itemContent={children}
      {...virtuosoProps}
    />
  );
};

InfiniteGrid.LoadMore = LoadMoreItems;

export default InfiniteGrid;
