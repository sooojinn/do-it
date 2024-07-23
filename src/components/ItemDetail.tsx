"use client";

import { ListItemDetail } from "@/config/types";
import styles from "@/styles/ItemDetail.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import FileInput from "./FileInput";
import { deleteItem, patchItem } from "@/lib/api";
import { useRouter } from "next/navigation";

interface ItemDetailProp {
  item: ListItemDetail;
}

export default function ItemDetail({ item }: ItemDetailProp) {
  const router = useRouter();
  const type = item.isCompleted ? "done" : "todo";
  const initialValues = {
    name: item.name,
    memo: item.memo ?? "",
    imageUrl: item.imageUrl ?? "",
  };
  const [values, setValues] = useState(initialValues);
  const [isModified, setIsModified] = useState(false);

  const handleChange = (name: string, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value ?? "",
    }));
  };

  // 수정한 내용이 있는지 체크 (없으면 '수정 완료' 버튼 비활성화)
  useEffect(() => {
    const isChanged =
      values.name !== initialValues.name ||
      values.memo !== initialValues.memo ||
      values.imageUrl !== initialValues.imageUrl;

    console.log(values.memo, initialValues.memo);

    setIsModified(isChanged);
  }, [values, initialValues]);

  const handleModifyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await patchItem(item.id, values);

    if (res.ok) {
      alert("수정되었습니다.");
      router.push("/");
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await deleteItem(item.id);

    if (res.ok) {
      alert("삭제되었습니다.");
      router.push("/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  return (
    <section className={styles.section}>
      <form className={styles.itemForm}>
        <div
          className={`${styles.itemName} ${type === "done" ? styles.done : ""}`}
        >
          <Image
            src={`/${type}_icon.svg`}
            width={32}
            height={32}
            alt={`${type}_icon`}
          />
          <input
            className={styles.inputName}
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.fileAndMemoWrapper}>
          <FileInput
            name="imageUrl"
            value={values.imageUrl}
            initialPreview={values.imageUrl}
            onChange={handleChange}
          />
          <div className={styles.memoWrapper}>
            <p className={styles.memo}>Memo</p>
            <textarea
              className={styles.inputMemo}
              name="memo"
              value={values.memo ?? ""}
              onChange={handleTextareaChange}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className={styles.btn}
            disabled={!isModified}
            onClick={handleModifyClick}
          >
            <Image
              src={`/modify_btn${isModified ? "_active" : ""}.svg`}
              width={168}
              height={56}
              alt="수정 완료"
            />
          </button>
          <button className={styles.btn} onClick={handleDeleteClick}>
            <Image
              src="/delete_btn.svg"
              width={168}
              height={56}
              alt="삭제 완료"
            />
          </button>
        </div>
      </form>
    </section>
  );
}
