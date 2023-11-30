"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

type Props = {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
};

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

const NotionPage = ({ recordMap, rootPageId }: Props) => {
  if (!recordMap) {
    return;
  }

  return (
    <>
      <NotionRenderer
        rootPageId={rootPageId}
        pageAside={<div>test</div>}
        recordMap={recordMap}
        fullPage
        darkMode
        previewImages
        disableHeader
        components={{ Collection }}
      />
    </>
  );
};

export default NotionPage;
