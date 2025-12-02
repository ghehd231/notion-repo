"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

type Props = {
  // After unifying `notion-types` versions (see `package.json` overrides), use the
  // proper type here. If you haven't run `npm install` after updating overrides,
  // you may still get a type conflict locally — run install on Node >= 18.
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
};

// ...existing code...
const Collection = dynamic(
  () => import("react-notion-x").then((m: any) => m.Collection),
  { ssr: false }
);

const NotionPage = ({ recordMap, rootPageId }: Props) => {
  if (!recordMap) {
    return;
  }

  return (
    <NotionRenderer
      rootPageId={rootPageId}
      recordMap={recordMap as ExtendedRecordMap}
      fullPage
      previewImages
      disableHeader
      showCollectionViewDropdown
      components={{ Collection }}
    />
  );
};

export default NotionPage;
