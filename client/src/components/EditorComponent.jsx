import { Editor } from "react-draft-wysiwyg";
// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = ({ setEditorState, editorState }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={(editorState) => setEditorState(editorState)}
    />
  );
};

export default EditorComponent;
