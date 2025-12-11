import { useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  disabled,
  style,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleInput = (e) => {
    onChange(e.currentTarget.innerHTML);
  };

  return (
    <div
      className="w-full border border-slate-300 rounded-md overflow-hidden shadow-sm"
      style={style}
    >
      {/* Toolbar */}
      {!disabled && (
        <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-300">
          <button
            type="button"
            onClick={() => applyFormat("bold")}
            className="p-2 hover:bg-slate-200 rounded transition text-slate-700"
            title="Negrito (Ctrl+B)"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("italic")}
            className="p-2 hover:bg-slate-200 rounded transition text-slate-700"
            title="Itálico (Ctrl+I)"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("underline")}
            className="p-2 hover:bg-slate-200 rounded transition text-slate-700"
            title="Sublinhado (Ctrl+U)"
          >
            <Underline size={18} />
          </button>
          <div className="w-px bg-slate-300 mx-1"></div>
          <button
            type="button"
            onClick={() => applyFormat("insertUnorderedList")}
            className="p-2 hover:bg-slate-200 rounded transition text-slate-700"
            title="Lista"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("insertOrderedList")}
            className="p-2 hover:bg-slate-200 rounded transition text-slate-700"
            title="Lista Numerada"
          >
            <ListOrdered size={18} />
          </button>
          <div className="w-px bg-slate-300 mx-1"></div>
          <button
            type="button"
            onClick={() => applyFormat("removeFormat")}
            className="px-3 py-2 hover:bg-slate-200 rounded transition text-slate-700 text-sm font-medium"
            title="Limpar formatação"
          >
            Limpar
          </button>
        </div>
      )}
      {/* Editor */}
      <div
        contentEditable={!disabled}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset overflow-y-auto text-slate-800 bg-white ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"
        }`}
        dangerouslySetInnerHTML={{ __html: value }}
        suppressContentEditableWarning
      />
    </div>
  );
}
