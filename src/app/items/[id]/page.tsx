"use client";

import ItemDetail from "@/components/ItemDetail";
import { ListItemDetail } from "@/config/types";
import { getItemDetail } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  // 동적 라우트 파라미터에 접근
  const params = useParams();
  const id = +params.id;

  const [item, setItem] = useState<ListItemDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const nextItem = await getItemDetail(id);
      setItem(nextItem);
    };

    fetchData();
  }, [id]);

  if (!item) return;

  return <ItemDetail item={item} />;
}
