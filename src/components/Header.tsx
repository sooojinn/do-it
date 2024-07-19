import styles from "@/styles/Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src="/logo.svg"
        width={151}
        height={40}
        alt="do it;"
      />
    </header>
  );
}
