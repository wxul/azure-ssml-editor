import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import { Quill } from "quill";
import "react-quill/dist/quill.snow.css";

const CustomToolbar = React.forwardRef<HTMLDivElement, {}>(function (
  props,
  ref
) {
  return (
    <div id="az_toolbar" className="toolbar" ref={ref}>
      <select name="" id="" className="ql-selectStyle">
        <option value="sad">sad</option>
        <option value="angry">angry</option>
        <option value="chat">chat</option>
      </select>
    </div>
  );
});

const Editor: FC<{}> = function (props) {
  const [html, setHtml] = useState("");
  const refQuill = useRef<ReactQuill>(null);
  const refToolbar = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e) => {
      setHtml(e);
    },
    [setHtml]
  );

  useEffect(() => {
    if (refQuill) {
      refQuill.current
        ?.getEditor()
        .clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          delta.ops = (delta.ops || []).map((op) => {
            return {
              insert: op.insert,
            };
          });
          return delta;
        });
    }
  }, [refQuill]);

  return (
    <div>
      <CustomToolbar ref={refToolbar}></CustomToolbar>
      <ReactQuill
        ref={refQuill}
        onChange={handleChange}
        placeholder="Type your script."
        modules={{
          toolbar: {
            container: "#az_toolbar",
            handlers: {
              selectStyle: function () {
                const quill = refQuill.current?.getEditor();
                if (quill) {
                  const cursorPosition = quill.getSelection()?.index ?? -1;
                  quill.insertText(cursorPosition, "★");
                  // quill.setSelection(cursorPosition + 1);
                }
              },
            },
          },
        }}
      >
        <div className="my-editing-area" />
      </ReactQuill>
    </div>
  );
};

export default Editor;
