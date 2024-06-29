"use client";

import { useQuery } from "@tanstack/react-query";
import { Container, Grid } from "@radix-ui/themes";

import { fetchDatabase } from "@/services/api/databases";

import Card from "@/app/components/Card";

const NotionPage = () => {
  //TODO
  // [x] database logic local api로 분리
  // [x] 카드 컴포넌트 생성
  // [x] notion query 데이터 파싱
  // [x] 카드 grid로 변경
  // [ ] 무한 스크롤 구현
  // [ ] search 컴포넌트 생성
  // [ ] search 기능 구현
  // [ ] 페이지 이동 시, 렌더링 시 loading 구현

  const { data } = useQuery({ queryKey: ["table"], queryFn: fetchDatabase });
  console.log("test22", data);
  return (
    <Container>
      <Grid mt="3" columns={{ xs: "2", md: "4", lg: "5" }} gap="3">
        {data?.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            date={item.date}
            public_url={item.public_url}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default NotionPage;
