"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
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

  return (
    <>
      <NotionRenderer recordMap={recordMap} fullPage darkMode />
    </>
  );
};

export default NotionPage;
