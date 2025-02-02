import {
  ListItem,
  ListItemDetail,
  PatchItemParams,
  PatchIsCompletedParams,
} from "@/config/types";

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

export async function getItemDetail(id: number): Promise<ListItemDetail> {
  const res = await fetch(baseUrl + `/items/${id}`, {
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

export async function patchIsCompleted(
  id: number,
  data: PatchIsCompletedParams
) {
  const res = await fetch(baseUrl + `/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("데이터를 저장하는 데 실패했습니다.");
  }

  return res;
}

export async function patchItem(id: number, data: PatchItemParams) {
  const res = await fetch(baseUrl + `/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("데이터를 저장하는 데 실패했습니다.");
  }
  return res;
}

export async function deleteItem(id: number) {
  const res = await fetch(baseUrl + `/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("데이터를 저장하는 데 실패했습니다.");
  }

  return res;
}
