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

const Collection = dynamic(async () => {
  try {
    const mod = await import("react-notion-x/build/third-party/collection");
    return (mod as any).default ?? (mod as any).Collection ?? (() => null);
  } catch (e) {
    // fallback to noop component if import fails
    return () => null;
  }
}, { ssr: false });

const Code = dynamic(async () => {
  try {
    const mod = await import("react-notion-x/build/third-party/code");
    return (mod as any).default ?? (mod as any).Code ?? (() => null);
  } catch (e) {
    // eslint-disable-next-line react/display-name
    return ({ code }: { code?: string }) => (
      <pre className="notion-code">{code ?? ""}</pre>
    );
  }
}, { ssr: false });


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
      components={{ Collection, Code }}
    />
  );
};

export default NotionPage;
