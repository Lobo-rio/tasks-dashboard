import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function RichTextEditor({ value, onChange, placeholder, disabled }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Initialize editor state from prop value (HTML string)
  useEffect(() => {
    if (value) {
      const contentBlock = htmlToDraft(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, []); // Run once on mount. Warning: this doesn't sync if value changes externally after mount, but standard for controlled editors to avoid cursor jumps.

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
    if (onChange) {
      const html = draftToHtml(convertToRaw(newState.getCurrentContent()));
      onChange(html);
    }
  };

  return (
    <div className={`border border-slate-300 rounded-md overflow-hidden bg-white ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor min-h-[200px] px-4"
        onEditorStateChange={onEditorStateChange}
        placeholder={placeholder}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
          inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
          list: { inDropdown: false },
          textAlign: { inDropdown: false },
          link: { inDropdown: false },
          history: { inDropdown: false },
        }}
      />
    </div>
  );
}
