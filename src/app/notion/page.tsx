"use client";

import { type ReactNode, forwardRef, useMemo, memo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Grid } from "@radix-ui/themes";

import { fetchDatabase } from "@/services/api/databases";

import Card from "@/app/components/Card";

import InfiniteGrid from "@/app/components/InfiniteGrid";

const ContainerList = memo(
  forwardRef<HTMLDivElement, { children?: ReactNode }>(({ children }, ref) => {
    return (
      <Grid
        as="div"
        ref={ref}
        mt="5"
        mb="5"
        justify="center"
        columns={{ initial: "2", xs: "2", md: "4", lg: "5" }}
        gap="3"
      >
        {children}
      </Grid>
    );
  })
);
ContainerList.displayName = "List";

const NotionPage = () => {
  //TODO
  // [x] database logic local api로 분리
  // [x] 카드 컴포넌트 생성
  // [x] notion query 데이터 파싱
  // [x] 카드 grid로 변경
  // [x] 무한 스크롤 구현
  // [ ] search 컴포넌트 생성
  // [ ] search 기능 구현
  // [ ] 페이지 이동 시, 렌더링 시 loading 구현

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
    <section className="sticky top-0 flex flex-col w-full h-full max-w-screen-xl gap-4 p-3 m-auto">
      <InfiniteGrid
        items={items}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      >
        {(index, item) => (
          <Card
            key={index}
            title={item.title}
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
