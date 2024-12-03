"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchDatabase } from "@/services/api/databases";

import Card from "@/app/components/Card";

import InfiniteGrid from "@/app/components/InfiniteGrid";

const NotionPage = () => {
  const fetchDatabasePage = async (pageParam: string) => {
    const { info, next_cursor, has_more } = await fetchDatabase({
      next_cursor: pageParam,
    });

    return {
      data: info,
      nextCursor: next_cursor,
      hasMore: has_more,
    };
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infinite-card"],
      queryFn: ({ pageParam }) => fetchDatabasePage(pageParam),
      initialPageParam: "",
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextCursor : undefined,
    });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages]
  );

  return (
    <section className="sticky top-0 flex flex-col w-full h-full max-w-screen-xl gap-4 p-3 m-auto mb-28">
      <InfiniteGrid
        items={items}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {(index, item) => (
          <Card
            key={index}
            title={item.title}
            tech={item.tech}
            date={item.date}
            public_url={item.public_url}
            loading={isLoading}
          />
        )}
      </InfiniteGrid>
      {hasNextPage && (
        <InfiniteGrid.LoadMore>
          <Card.Skeleton />
        </InfiniteGrid.LoadMore>
      )}
    </section>
  );
};

export default NotionPage;
