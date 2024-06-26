import Link from "next/link";
import parse from "html-react-parser";

export default function Header({ data }) { 
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="nav-contents">
              {Object.keys(data.main_menu_data).map((link) => {
                return (
                  <ul key={link}>
                    <li> 
                      <Link
                        key={link}
                        href={parse(
                          data.main_menu_data[link]["parent_link"]["url"]
                        )}
                        prefetch={false}
                      >
                        <a>
                          {parse(
                            data.main_menu_data[link]["parent_link"]["title"]
                          )}
                        </a>
                      </Link>
                    </li>
                    {data.main_menu_data[link]["basic_drop_down"].length > 0 &&
                      Object.keys(
                        data.main_menu_data[link]["basic_drop_down"]
                      ).map((dropDownLink) => {
                        return (
                          <ul key={dropDownLink}>
                            <li>
                              <Link
                                key={dropDownLink}
                                href={parse(
                                  data.main_menu_data[link]["basic_drop_down"][
                                    dropDownLink
                                  ]["sub_menu_item"]["url"]
                                )}
                                prefetch={false}
                              >
                                <a>
                                  {parse(
                                    data.main_menu_data[link][
                                      "basic_drop_down"
                                    ][dropDownLink]["sub_menu_item"]["title"]
                                  )}
                                </a>
                              </Link>
                            </li>
                          </ul>
                        );
                      })}
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
