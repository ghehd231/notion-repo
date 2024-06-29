"use client";

import { useEffect } from "react";
import { fetchDatabase } from "@/services/api/databases";

const NotionPage = () => {
  //TODO
  // [x] database logic local api로 분리
  // [ ] 카드 컴포넌트 생성
  // [ ] 카드 grid로 변경
  // [ ] 무한 스크롤 구현
  // [ ] search 컴포넌트 생성
  // [ ] search 기능 구현
  // [ ] 페이지 이동 시, 렌더링 시 loading 구현
  useEffect(() => {
    (async () => {
      const res = await fetchDatabase();
      console.log("test", res);
    })();
  }, []);
  return <div>Notion Test Page</div>;
};

export default NotionPage;
