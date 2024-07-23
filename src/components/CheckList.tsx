import { ListItem, ListType } from "@/config/types";
import { patchIsCompleted } from "@/lib/api";
import styles from "@/styles/CheckList.module.css";
import Image from "next/image";
import Link from "next/link";

interface BaseProps {
  type: ListType;
}
interface CheckListProps extends BaseProps {
  list: ListItem[];
}
interface CheckListItemProps extends BaseProps {
  item: ListItem;
}

interface EmptyListProps extends BaseProps {}

const emptyMessages = {
  todo: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  done: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
};

// todo-list와 done-list의 공용 컴포넌트
export default function CheckList({ type, list }: CheckListProps) {
  const isEmpty = !list.length;
  return (
    <section className={styles.list}>
      <Image src={`/${type}.svg`} width={101} height={36} alt={type} />
      <div className={styles.listItems}>
        {isEmpty && <EmptyList type={type} />}
        {list.map((item) => (
          <div
            key={item.id}
            className={`${styles.listItem} ${
              type === "done" ? styles.done : ""
            }`}
          >
            <CheckListItem type={type} item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckListItem({ type, item }: CheckListItemProps) {
  // 할 일 항목의 왼쪽 버튼을 클릭하면 isCompleted 필드 수정
  const handleClick = async (id: number) => {
    const isCompleted = type === "todo" ? true : false;
    const data = {
      isCompleted: isCompleted,
    };
    const res = await patchIsCompleted(id, data);

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <>
      <Image
        src={`/${type}_icon.svg`}
        width={32}
        height={32}
        alt={`${type}_icon`}
        onClick={() => {
          handleClick(item.id);
        }}
      />
      <Link href={`/items/${item.id}`}>{item.name}</Link>
    </>
  );
}

// 리스트에 어떤 항목도 없을 때 보이는 컴포넌트
function EmptyList({ type }: EmptyListProps) {
  return (
    <>
      <Image
        className={styles.emptyImg}
        src={`/${type}_empty.svg`}
        width={240}
        height={240}
        alt="empty"
      />
      <div className={styles.emptyMessage}>
        {emptyMessages[type].map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  );
}
