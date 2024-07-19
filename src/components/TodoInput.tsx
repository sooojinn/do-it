import { postItem } from "@/lib/api";
import styles from "@/styles/TodoInput.module.css";
import { FormEvent, useState } from "react";

export default function TodoInput() {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postItem(name);

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <button className={styles.btn} type="submit">
          + 추가하기
        </button>
        <div className={styles.btnShadow}></div>
      </div>
    </form>
  );
}
