"use client";

import TodoInput from "@/components/TodoInput";
import CheckList from "@/components/CheckList";
import styles from "@/styles/HomePage.module.css";
import { getItems } from "@/lib/api";
import { useEffect, useState } from "react";
import { ListItem } from "@/config/types";

export default function Home() {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    // 서버에서 할 일 목록 불러오기
    const fetchData = async () => {
      const res = await getItems();
      setList(res);
    };
    fetchData();
  }, []);

  const isEmpty = !list.length;
  // 완료 여부를 기준으로 todo-list와 done-list로 분류
  const todoList = list.filter((el) => el.isCompleted === false);
  const doneList = list.filter((el) => el.isCompleted === true);

  return (
    <section className={styles.section}>
      <TodoInput isEmpty={isEmpty} />
      <section className={styles.listBoard}>
        <CheckList type="todo" list={todoList} />
        <CheckList type="done" list={doneList} />
      </section>
    </section>
  );
}
