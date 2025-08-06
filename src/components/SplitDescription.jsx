import PropTypes from "prop-types";
import { useState } from "react";
import truncateText from "../utils/truncateText";

export default function SplitDescription({ text, length }) {
  const [seeMore, setSeeMore] = useState(false);
  const splitText = truncateText(text, length);

  return (
    <div className={`w-full`}>
      {" "}
      <div className={``}>
        <span
          onClick={() => {
            if (seeMore) {
              setSeeMore(false);
            }
          }}
          className={`${seeMore ? "cursor-pointer" : ""} inline`}
        >
          {text ? (seeMore ? text : splitText) : "N/A"}
        </span>
        {text?.length > length && (
          <span
            onClick={() => setSeeMore(true)}
            className={`text-primary font-medium cursor-pointer whitespace-nowrap inline`}
          >
            {seeMore ? "" : "see more"}
          </span>
        )}
      </div>
    </div>
  );
}

SplitDescription.propTypes = {
  text: PropTypes.string,
  length: PropTypes.number.isRequired
};
