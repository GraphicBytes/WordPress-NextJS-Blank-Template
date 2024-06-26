import PageHeader from "./PageHeader";
import PostBuilder from "./PostBuilder";
import Author from "./Author";

export default function Post({ data }) {
  return (
    <>
      {data.header_image && (
        <PageHeader title={data.page_title} image={data.header_image} />
      )}
      <main>
        <div className="container">
          <div className="row">
            <div className="col-8 offset-2">
              <PostBuilder data={data.page_data} />
              <Author
                name={data.author}
                image={data.author_image}
                date={data.publish_date}
              />
            </div>
          </div> 
        </div>
      </main>
    </>
  ); 
}
