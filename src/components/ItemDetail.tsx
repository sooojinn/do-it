"use client";

import { ListItemDetail } from "@/config/types";
import styles from "@/styles/ItemDetail.module.css";
import Image from "next/image";
import { useState } from "react";
import FileInput from "./FileInput";
import { deleteItem, patchItem } from "@/lib/api";

interface ItemDetailProp {
  item: ListItemDetail;
}

export default function ItemDetail({ item }: ItemDetailProp) {
  console.log(item);
  const type = item.isCompleted ? "done" : "todo";
  const [values, setValues] = useState({
    name: item.name,
    memo: item.memo,
    imageUrl: item.imageUrl,
  });

  const handleChange = (name: string, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value ?? "",
    }));
  };

  const handleModifyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await patchItem(item.id, values);

    if (res.ok) {
      alert("수정했습니다.");
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await deleteItem(item.id);

    if (res.ok) {
      alert("삭제되었습니다.");
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
        <button className={styles.btn} onClick={handleModifyClick}>
          <Image
            src="/modify_btn.svg"
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
  );
}
