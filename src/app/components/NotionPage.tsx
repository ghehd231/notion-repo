"use client";

import { Component, ReactNode } from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

type Props = {
  recordMap: ExtendedRecordMap;
  rootPageId?: string;
};

class NotionErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("NotionPage render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Failed to render page content
          </h2>
          <p className="text-gray-600">
            There was an error displaying this Notion page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

const Code = dynamic(
  async () => {
    try {
      const mod = await import("react-notion-x/build/third-party/code");
      return (mod as any).default ?? (mod as any).Code ?? (() => null);
    } catch (e) {
      // eslint-disable-next-line react/display-name
      return ({ code }: { code?: string }) => (
        <pre className="notion-code">{code ?? ""}</pre>
      );
    }
  },
  { ssr: false },
);

const NotionPage = ({ recordMap, rootPageId }: Props) => {
  if (!recordMap) {
    return null;
  }

  return (
    <NotionErrorBoundary>
      <NotionRenderer
        rootPageId={rootPageId}
        recordMap={recordMap}
        fullPage
        previewImages
        disableHeader
        showCollectionViewDropdown={false}
        components={{ Code }}
      />
    </NotionErrorBoundary>
  );
};

export default NotionPage;
