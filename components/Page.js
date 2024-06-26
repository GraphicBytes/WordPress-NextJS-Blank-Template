import PageHeader from "./PageHeader";
import PageBuilder from "./PageBuilder";

export default function Page({ data }) {
  return (
    <>
      {data.header_image && (
        <PageHeader title={data.page_title} image={data.header_image} />
      )}
      <main>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PageBuilder data={data.page_data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 
