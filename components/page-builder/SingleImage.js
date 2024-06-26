import parse from "html-react-parser";
import Image from "next/image";
import styles from "../../styles/page-builder/SingleImage.module.scss";

export default function SingleImage({ data }) {
  return (
    <div className={styles.singleImage}>
      <Image 
        src={parse(data["url"])}
        alt={parse(data["alt"])}
        title={parse(data["title"])}
        width={data["sizes"]["large-width"]}
        height={data["sizes"]["large-height"]}
        layout="responsive"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88x8AAt0B7bEE+qwAAAAASUVORK5CYII="
      />
      <span>{parse(data["caption"])}</span>
    </div> 
  );
}
