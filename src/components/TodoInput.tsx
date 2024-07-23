import { postItem } from "@/lib/api";
import styles from "@/styles/TodoInput.module.css";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface TodoIInputProps {
  isEmpty: boolean;
}

export default function TodoInput({ isEmpty }: TodoIInputProps) {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  // 게시 요청 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await postItem(name);

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={name}
          onChange={handleChange}
          placeholder="할 일을 입력해주세요"
        />
        <div className={styles.inputShadow}></div>
      </div>
      <div className={styles.btnWrapper}>
        <button
          className={`${styles.btn} ${isEmpty ? styles.empty : ""}`}
          type="submit"
        >
          <Image
            src={`/plus${isEmpty ? "_empty" : ""}.svg`}
            width={16}
            height={16}
            alt="+"
          />
          <span className={styles.btnText}>추가하기</span>
        </button>
        <div className={styles.btnShadow}></div>
      </div>
    </form>
  );
}
