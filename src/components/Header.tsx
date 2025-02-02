"use client";

import styles from "@/styles/Header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  // 로고를 클릭하면 홈페이지로 이동
  const handleClick = () => {
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          width={151}
          height={40}
          alt="do it;"
          onClick={handleClick}
        />
      </div>
    </header>
  );
}
