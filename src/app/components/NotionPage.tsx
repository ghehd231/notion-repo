"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

type Props = {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
};

const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    ),
  { ssr: false }
);

const NotionPage = ({ recordMap, rootPageId }: Props) => {
  if (!recordMap) {
    return;
  }

  return (
    <NotionRenderer
      rootPageId={rootPageId}
      recordMap={recordMap}
      fullPage
      previewImages
      disableHeader
      showCollectionViewDropdown
      components={{ Collection }}
    />
  );
};

export default NotionPage;
