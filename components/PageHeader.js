import parse from "html-react-parser";
import Image from "next/image";
import styles from "../styles/PageHeader.module.scss";

export default function PageHeader({ title, image }) {
  return (
    <div className={styles.pageHeader}>
      <Image
        src={parse(image["url"])}
        alt={parse(image["alt"])}
        title={parse(image["title"])}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88x8AAt0B7bEE+qwAAAAASUVORK5CYII="
        priority={true}
        quality="40"
      />
      <h1 className={styles.headerTitle}>{parse(title)}</h1>
    </div> 
  );
}
