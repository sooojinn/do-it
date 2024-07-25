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

export default function ItemForm({ item }: ItemDetailProp) {
  const router = useRouter();
  const type = item.isCompleted ? "done" : "todo";
  const initialValues = {
    name: item.name,
    memo: item.memo ?? "",
    imageUrl: item.imageUrl ?? "",
  };
  const [values, setValues] = useState(initialValues);
  const [isModified, setIsModified] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // 수정한 내용이 있는지 체크 (없으면 '수정 완료' 버튼 비활성화)
  useEffect(() => {
    const isChanged =
      values.name !== initialValues.name ||
      values.memo !== initialValues.memo ||
      values.imageUrl !== initialValues.imageUrl;

    setIsModified(isChanged);
  }, [values, initialValues]);

  // 수정 요청 함수
  const handleModifyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const res = await patchItem(item.id, values);
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  // 삭제 요청 함수
  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsPending(true);
      const res = await deleteItem(item.id);

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  // 모든 입력 필드의 변경 처리
  const handleChange = (name: string, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value ?? "",
    }));
  };

  // input 필드의 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // textarea 필드의 변경 처리
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
            disabled={!isModified || isPending}
            onClick={handleModifyClick}
          >
            <Image
              src={`/modify_btn${isModified ? "_active" : ""}.svg`}
              width={168}
              height={56}
              alt="수정 완료"
            />
          </button>
          <button
            className={styles.btn}
            disabled={isPending}
            onClick={handleDeleteClick}
          >
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
