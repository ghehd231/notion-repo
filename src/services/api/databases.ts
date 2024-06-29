export const fetchDatabase = async () => {
  const res = await fetch("/api/query", { method: "GET" });

  return res.json();
};
