export type RowType = {
  id: string;
  name: {
    id: string;
    title: [
      {
        text: { content: string };
      }
    ];
  };
  tag: {
    id: string;
    name: string;
  }[];
  date: {
    id: string;
    date: {
      start: string;
    };
  };
  url: string;
};
