"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  PageObjectResponse,
  SearchParameters,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import CommandPalette, {
  JsonStructureItem,
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from "react-cmdk";

import { fetchSearch } from "@/services/api/search";

import "react-cmdk/dist/cmdk.css";

type Properties = {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
};

const Command = () => {
  const [page] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const handleFetch = async (pageParam: string) => {
    if (!open) {
      return {
        data: [],
        nextCursor: null,
        hasMore: false,
      };
    }

    const param: SearchParameters = {
      query: search,
      start_cursor: pageParam === "" ? undefined : pageParam,
      filter: {
        property: "object",
        value: "page",
      },
    };
    const { next_cursor, results, has_more } = await fetchSearch(param);

    return {
      data: results,
      nextCursor: next_cursor,
      hasMore: has_more,
    };
  };

  const { data } = useInfiniteQuery({
    queryKey: ["search-databases", search, open],
    queryFn: ({ pageParam }) => handleFetch(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages]
  );

  const filteredItems = useMemo(() => {
    const filtered = items.map((item) => {
      const { properties } = item as PageObjectResponse;

      const findProperties = Object.values(properties).find(
        (item) => item.type === "title"
      ) as Properties;

      return {
        id: item.id,
        children: findProperties?.title.flatMap(
          (t) => t.plain_text || "not found"
        ),
        icon: "MagnifyingGlassCircleIcon",
        href: `/${item.id}`,
      } as JsonStructureItem;
    });

    return filterItems(
      [
        {
          heading: "Contact Me",
          id: "advanced",
          items: [
            {
              id: "github",
              children: "move to github",
              icon: "ArrowTopRightOnSquareIcon",
              href: "https://github.com/ghehd231",
            },
            {
              id: "phone",
              children: "phone: 010-7739-9829",
              icon: "DevicePhoneMobileIcon",
            },
          ],
        },
        {
          heading: "Posts",
          id: "posts",
          items: filtered,
        },
        {
          heading: "Resume",
          id: "Resume",
          items: [
            {
              id: "resume",
              children: "이력서",
              icon: "CodeBracketIcon",
              href: "/",
            },
          ],
        },
      ],
      search
    );
  }, [items, search]);

  useHandleOpenCommandPalette(setOpen);
  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length > 0 ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                >
                  <span className="max-w-md truncate dark:text-white">
                    {Array.isArray(rest.children) && rest.children.length === 0
                      ? "this item has no title"
                      : rest.children}
                  </span>
                </CommandPalette.ListItem>
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default Command;
