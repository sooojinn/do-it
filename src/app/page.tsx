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
    const fetchData = async () => {
      const res = await getItems();
      setList(res);
    };
    fetchData();
  }, []);

  const todoList = list.filter((el) => el.isCompleted === false);
  const doneList = list.filter((el) => el.isCompleted === true);

  return (
    <>
      <TodoInput />
      <section className={styles.listBoard}>
        <CheckList type="todo" list={todoList} />
        <CheckList type="done" list={doneList} />
      </section>
    </>
  );
}
