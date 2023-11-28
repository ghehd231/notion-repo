"use client";

import { ExtendedRecordMap } from "notion-types";

import { getPageTitle } from "notion-utils";

type Props = {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
};

const NotionPage = ({ recordMap, rootPageId }: Props) => {
  if (!recordMap) {
    return;
  }
  const title = getPageTitle(recordMap);

  return <>{title}</>;
};

export default NotionPage;
