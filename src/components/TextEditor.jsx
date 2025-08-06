import PropTypes from "prop-types";
import Quill from "quill"; // Import Quill
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

// Extend Quill to allow the class attribute on strong tags
const Parchment = Quill.import("parchment");
const ClassAttributor = new Parchment.Attributor.Class("class", "class", {
  scope: Parchment.Scope.INLINE
});
Quill.register(ClassAttributor, true);

const TextEditor = ({
  onChange = (e) => e,
  value,
  disable = false,
  placeholder = "write your content ....",
  classes,
  customPlaceholder = null,
  mentionOptions = [],
  gettingMentionIds = (ids) => ids,
  dataAuto
}) => {
  var modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color"
          ]
        }
      ],
      [
        {
          background: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "transparent",
            "custom-color"
          ]
        }
      ],

      ["clean"]
    ]
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "background",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "size",
    "script"
  ];

  const [mentionText, setMentionText] = useState("");
  const [mentionedIds, setMentionedIds] = useState([]);
  const handleProcedureContentChange = (content) => {
    function extractMentionText(htmlContent) {
      // Remove HTML tags using regex
      const textContent = htmlContent.replace(/<[^>]+>/g, "");

      // Regular expression to match "@" followed by the text
      const regex = /@(\S+)/;

      // Extracting text from the plain content
      const match = textContent.match(regex);

      // Return the first word after "@" if matched
      return match ? match[1] : null;
    }

    const mentionText = extractMentionText(content);
    setMentionText(mentionText);

    // Use a regular expression to match all elements with id starting with "mentioned-"
    const mentionedElements = content.match(
      /<[^>]+class="id-[^"]+"[^>]*>[^<]*<\/[^>]+>/g
    );

    const ids =
      mentionedElements?.map((item) => {
        const match = item.match(/class="id-(\d+)"/);
        return match ? parseInt(match[1], 10) : null;
      }) || [];

    setMentionedIds(ids);
  };

  // RETURN MENTION IDs WHEN CLICKING ON MENTION
  useEffect(() => {
    gettingMentionIds(mentionedIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentionedIds]);

  const selectOptions = (option) => {
    function replaceMentionWithSpan(htmlContent) {
      // Regular expression to match "@" followed by non-space characters
      const regex = /@(\S+)/g;

      // Replacing the "@mentionText" with the <strong> and <span> elements
      const updatedContent = htmlContent.replace(
        regex,
        // eslint-disable-next-line no-unused-vars
        (match, mentionText) =>
          `<strong class="id-${option?.id}" style="color: rgb(0, 102, 204); background-color: rgb(204, 224, 245);">${option?.name}</strong> `
      );

      return updatedContent;
    }

    const result = replaceMentionWithSpan(value);

    // Ensure quillInstance is defined before assigning
    const quillInstance = quillRef.current?.getEditor();
    if (quillInstance) {
      quillInstance.root.innerHTML = result;
    }

    onChange(result);
  };

  // ========================================
  // FOLLOWER
  const quillRef = useRef(null);
  const followerRef = useRef(null);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  // eslint-disable-next-line no-unused-vars
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    const quillInstance = quillRef.current?.getEditor();

    const updateFollower = () => {
      const range = quillInstance.getSelection();
      if (range) {
        const bounds = quillInstance.getBounds(range.index);
        const editorContainer = quillInstance.root.getBoundingClientRect();
        setWindowSize(window.scrollX);
        // Update follower position based on caret's position
        setCaretPosition({
          top: editorContainer.top + window.scrollY + bounds.top,
          left: editorContainer.left + window.scrollX + bounds.left
        });
      }
    };

    if (quillInstance) {
      quillInstance.on("editor-change", updateFollower);
    }

    return () => {
      if (quillInstance) {
        quillInstance.off("editor-change", updateFollower);
      }
    };
  }, []);

  // END FOLLOWER
  // ========================================

  return (
    <div data-auto={dataAuto} className="w-full">
      <div
        className={`w-full relative ${classes ? classes : "min-h-[300px]"} `}
      >
        <ReactQuill
          ref={quillRef}
          readOnly={disable}
          className={`bg-base-300 border border-primary overflow-hidden rounded-md ${
            classes ? classes : "min-h-[300px]"
          } `}
          theme="snow"
          value={value}
          onChange={(e) => {
            onChange(e);
            handleProcedureContentChange(e);
          }}
          modules={modules}
          formats={formats}
          placeholder={customPlaceholder ? customPlaceholder : placeholder}
        ></ReactQuill>

        {mentionText &&
          mentionOptions?.filter((option) =>
            option?.name?.toLowerCase()?.match(mentionText.toLowerCase())
          )?.length > 0 && (
            <ul
              ref={followerRef}
              style={{
                position: "absolute",
                top: `${caretPosition.top}px`,
                left: `${caretPosition.left}px`
              }}
              className={`${
                caretPosition.left > 30 ? "ml-[-200px]" : "ml-[-10px]"
              }  mt-[-60px] md:ml-[-270px] md:mt-[-110px]  border absolute z-40 bg-base-300 w-[300px] rounded-xl shadow-md max-h-[300px] overflow-y-auto scrollbar`}
            >
              {mentionOptions
                ?.filter((option) =>
                  option?.name?.toLowerCase()?.match(mentionText.toLowerCase())
                )
                ?.map((option, i) => (
                  <li
                    key={i}
                    className={`border-b py-3 px-5 cursor-pointer w-full hover:bg-primary hover:text-base-300`}
                    onClick={() => selectOptions(option)}
                  >
                    {option?.name}
                  </li>
                ))}
            </ul>
          )}
      </div>
    </div>
  );
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  placeholder: PropTypes.string,
  classes: PropTypes.string.isRequired,
  customPlaceholder: PropTypes.string,
  mentionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  gettingMentionIds: PropTypes.func,
  dataAuto: PropTypes.string
};

export default TextEditor;
