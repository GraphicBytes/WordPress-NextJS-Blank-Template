import FullWidthTextSection from "./page-builder/FullWidthTextSection";
import SingleImage from "./page-builder/SingleImage";
import ImageCarousel from "./page-builder/ImageCarousel";


const pageComponents = {
  full_width_text_section: FullWidthTextSection,
  full_width_image: SingleImage,
  image_carousel: ImageCarousel
};
 
export default function PageBuilder({ data }) {
  return (
    <main role="main" className="">
      {data && 
        Object.keys(data).map((current, index) => {
          const currentData = data[current];
          const currentModule = currentData['acf_fc_layout']; 
          const CurrentPageComponent = pageComponents[currentModule]; 
 
          return (
            <section key={index}>
              {CurrentPageComponent && <CurrentPageComponent data={currentData}/> }
            </section>
          );
        })} 
    </main>
  );
}