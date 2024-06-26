import PageHeader from "./PageHeader";
import Link from "next/link";
import parse from "html-react-parser";
import Image from "next/image";
import styles from "../styles/Archive.module.scss";

export default function Archive({ data }) {
  return (
    <>
      {data.header_image && (
        <PageHeader title={data.page_title} image={data.header_image} />
      )}
      <main>
        <div className="container">
          <div className="row">
            {Object.keys(data.posts).map((post) => {
              return (
                <div className="col-4" key={post}>
                  <div key={post} className={styles.card}>
                    <Link href={parse(data.posts[post]["slug"])}>
                      <a> 
                        <h2>
                          {parse(data.posts[post]["title"])}
                        </h2>
                        {data.posts[post]["preview_image"] && (
                          <Image
                            src={data.posts[post]["preview_image"]["url"]}
                            alt={data.posts[post]["preview_image"]["alt"]}
                            title={parse(
                              data.posts[post]["preview_image"]["title"]
                            )}
                            width={
                              data.posts[post]["preview_image"]["sizes"][
                                "large-width"
                              ]
                            }
                            height={
                              data.posts[post]["preview_image"]["sizes"][
                                "large-height"
                              ]
                            }
                            layout="responsive"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88x8AAt0B7bEE+qwAAAAASUVORK5CYII="
                          />
                        )}
                        <div className={styles.description}>
                          {parse(data.posts[post]["excerpt"])}
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
