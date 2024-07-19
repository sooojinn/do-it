import { ListItem, ListType } from "@/config/types";
import styles from "@/styles/CheckList.module.css";
import Image from "next/image";

interface CheckListProps {
  type: ListType;
  list: ListItem[];
}

interface CheckListItemProps {
  type: ListType;
  item: ListItem;
}

interface EmptyListProps {
  type: ListType;
}

const emptyMessages = {
  todo: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  done: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
};

function CheckListItem({ type, item }: CheckListItemProps) {
  return (
    <div
      key={item.id}
      className={`${styles.listItem} ${type === "done" ? styles.done : ""}`}
    >
      <Image
        src={`/${type}_icon.svg`}
        width={32}
        height={32}
        alt={`${type}_icon`}
      />
      {item.name}
    </div>
  );
}

function EmptyList({ type }: EmptyListProps) {
  return (
    <>
      <Image src={`/${type}_empty.svg`} width={240} height={240} alt="empty" />
      <div className={styles.emptyMessage}>
        {emptyMessages[type].map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>{" "}
    </>
  );
}

export default function CheckList({ type, list }: CheckListProps) {
  const isEmpty = !list.length;
  return (
    <section className={styles.list}>
      <Image src={`/${type}.svg`} width={101} height={36} alt={type} />
      <div className={styles.listItems}>
        {isEmpty && <EmptyList type={type} />}
        {list.map((item) => (
          <CheckListItem type={type} item={item} />
        ))}
      </div>
    </section>
  );
}
