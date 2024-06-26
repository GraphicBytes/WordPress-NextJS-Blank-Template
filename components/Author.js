import parse from "html-react-parser";
import Image from "next/image";
import styles from "../styles/Author.module.scss";

export default function Author({ name, image, date }) {
  return (
    <div className={`row ${styles.authorRow}`}>
      <div className="col-12">
        <div className={styles.authorBox}>
          <div className={styles.authorImage}>
            <Image
              src={parse(image["url"])}
              alt={parse(image["alt"])}
              title={parse(image["title"])} 
              width={image["sizes"]["large-width"]}
              height={image["sizes"]["large-height"]}
              layout="responsive"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88x8AAt0B7bEE+qwAAAAASUVORK5CYII="
            /> 
          </div>
          <span>
            Written by {name}
            <br />
            Published {date}
          </span>
        </div>
      </div>
    </div>
  );
}
