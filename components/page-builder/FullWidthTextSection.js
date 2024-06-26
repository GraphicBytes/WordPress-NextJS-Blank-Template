import parse from "html-react-parser";

export default function FullWidthTextSection({ data }) {
  return <>{parse(data)}</>;
}
 