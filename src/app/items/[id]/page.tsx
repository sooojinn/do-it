import { getItems } from "@/lib/api";
import styles from "@/styles/ItemDetail.module.css";

interface ItemsDetailParams {
  params: { id: string };
}

export async function generateStaticParams() {
  const items = await getItems();
  return items.map((item) => ({
    id: item.id.toString(),
  }));
}

export default function ItemDetail({ params }: ItemsDetailParams) {
  const { id } = params;
  return (
    <section className={styles.section}>
      <div className={styles.itemName}>{id}비타민 챙겨 먹기</div>
    </section>
  );
}
