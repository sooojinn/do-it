import { ListItem } from "@/config/types";

const baseUrl = "https://assignment-todolist-api.vercel.app/api/7263";

export async function getItems(): Promise<ListItem[]> {
  const res = await fetch(baseUrl + "/items", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  const result = res.json();
  return result;
}

export async function postItem(data: string) {
  const body = { name: data };
  const res = await fetch(baseUrl + "/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("데이터를 저장하는 데 실패했습니다.");
  }

  return res;
}
