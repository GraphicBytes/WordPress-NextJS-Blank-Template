import FullWidthTextSection from "./page-builder/FullWidthTextSection";
import SingleImage from "./page-builder/SingleImage";
import ImageCarousel from "./page-builder/ImageCarousel";

export default function PageBuilder({ data }) {
  return (
    <>
      {data && (
        <>
          {Object.keys(data).map((pageSection, index) => {
            let section;
            if (
              data[pageSection]["acf_fc_layout"] === "full_width_text_section"
            ) {
              section = (
                <FullWidthTextSection data={data[pageSection]["content"]} />
              );
            } else if (
              data[pageSection]["acf_fc_layout"] === "full_width_image"
            ) {
              section = (
                <SingleImage data={data[pageSection]["content"]} />
              );
            } else if (
              data[pageSection]["acf_fc_layout"] === "image_carousel"
            ) {
              section = <ImageCarousel data={data[pageSection]["content"]} />;
            }
            return ( 
              <div className="row builder-row" key={index}>
                <div className="col-12">
                  {section}
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
