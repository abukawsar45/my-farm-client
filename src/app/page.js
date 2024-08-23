import Image from "next/image";
import styles from "./page.module.css";
import AddCategory from "@/components/AddCategory";
import AddAnimal from "@/components/AddAnimal";
import AllAnimal from "@/components/AllAnimal";

export default function Home() {
  return (
    <main className={styles.main}>
      <AllAnimal/>
    </main>
  );
}
