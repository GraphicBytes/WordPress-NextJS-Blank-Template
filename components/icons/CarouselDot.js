import styles from "../../styles/page-builder/ImageCarousel.module.scss";

export const CarouselDot = ({ onClick, selected }) => (
  <button
    className={`${styles.carouselDot} ${selected ? `${styles.selected}` : ""}`}
    type="button"
    onClick={onClick} 
  />
);  



