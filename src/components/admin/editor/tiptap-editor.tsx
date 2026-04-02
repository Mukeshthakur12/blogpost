'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import {Table} from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { FontSize } from '@/lib/fontSize'; 
import CharacterCount from '@tiptap/extension-character-count';

import { useRef, useState } from 'react';

const EMOJIS = [
  '😀','😂','😍','🥰','😎','🤔','😢','😡','👍','👎',
  '❤️','🔥','✅','❌','⭐','🎉','🚀','💡','📝','🔗',
  '📸','🎵','🎬','📊','🌍','🌟','💬','🏆','🎯',
  '📱','📲','💻','🖥️','⌚',
  '⚙️','🧠','💾','📀','🔋','🔌','📶',
  '📷','📸','🤳',
  '🔊','🎧','🎤',
  '📡','🌐','📍',
];

function Btn({
  onClick, active, title, children, danger,
}: {
  onClick: () => void; active?: boolean; title?: string;
  children: React.ReactNode; danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        px-2 py-1 rounded text-xs font-medium transition-all duration-150 whitespace-nowrap
        ${danger
          ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
          : active
            ? 'bg-indigo-600 text-white shadow-inner'
            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-gray-300 mx-0.5 self-center flex-shrink-0" />;
}

function ToolGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-1">{children}</div>;
}

export default function TiptapEditor({ content, onChange }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [fontColor, setFontColor] = useState('#000000');
  const [highlightColor, setHighlightColor] = useState('#ffff00');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      TextStyle, Color, FontSize, Underline,
      Highlight.configure({ multicolor: true }),
      Subscript, Superscript, BulletList, OrderedList,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: true, allowBase64: true }),
      Youtube,
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      Link.configure({ openOnClick: false }),
      CharacterCount,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'min-h-[500px] p-6 outline-none prose prose-lg max-w-none focus:ring-0',
      },
    },
  });

  if (!editor) return null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    editor.chain().focus().setImage({ src: data.url, }).run();
    e.target.value = '';
  };

  const setLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = prompt('Enter URL:', prev || 'https://');
    if (url === null) return;
    if (url === '') { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const insertTable = () =>
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();

  const wordCount = editor.storage.characterCount?.words() ?? 0;
  const charCount = editor.storage.characterCount?.characters() ?? 0;

  return (
    <div className="font-sans border border-gray-200 bg-white rounded-2xl shadow-xl overflow-hiddenflex flex-col">

      {/* TOOLBAR */}
      <div className="fixed bottom-5  z-[100] ">
      <div
        className="bg-gray-50 border-b border-gray-200 p-2 flex flex-col gap-2"
        onMouseDown={(e) => e.preventDefault()}
      >

        {/* Row 1: Undo/Redo, Headings, Text Style, Font Size, Colors */}
        <div className="flex flex-wrap gap-2 items-center">
          <ToolGroup>
            <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo">↩ Undo</Btn>
            <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo">↪ Redo</Btn>
          </ToolGroup>

          <Divider />

          <ToolGroup>
            <Btn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')}>P</Btn>
            {([1,2,3,4,5,6] as const).map((level) => (
              <Btn key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                active={editor.isActive('heading', { level })}
              >H{level}</Btn>
            ))}
          </ToolGroup>

          <Divider />

          <ToolGroup>
            <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><strong>B</strong></Btn>
            <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><em>I</em></Btn>
            <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><span className="underline">U</span></Btn>
            <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><span className="line-through">S</span></Btn>
            <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')}>X₂</Btn>
            <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')}>X²</Btn>
          </ToolGroup>

          <Divider />

          <select
            className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 h-7"
            title="Font size"
            onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
            defaultValue=""
          >
            <option value="" disabled>Size</option>
            {['12px','14px','16px','18px','20px','24px','28px','32px','40px','48px','64px'].map((s) => (
              <option key={s} value={s}>{s.replace('px','')}</option>
            ))}
          </select>

          <Divider />

          {/* Font Color */}
          <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-700 border border-gray-200 rounded px-2 py-1 bg-white hover:bg-gray-100 h-7" title="Text color">
            <span className="font-bold" style={{ color: fontColor }}>A</span>
            <input type="color" value={fontColor}
              onChange={(e) => { setFontColor(e.target.value); editor.chain().focus().setColor(e.target.value).run(); }}
              className="w-4 h-4 cursor-pointer border-0 p-0 opacity-0 absolute"
            />
            <span style={{ display:'inline-block', width:12, height:4, background:fontColor, borderRadius:2 }} />
          </label>

          {/* Highlight Color */}
          <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-700 border border-gray-200 rounded px-2 py-1 bg-white hover:bg-gray-100 h-7" title="Highlight">
            <span style={{ background: highlightColor, padding:'0 2px', borderRadius:2 }}>H</span>
            <input type="color" value={highlightColor}
              onChange={(e) => { setHighlightColor(e.target.value); editor.chain().focus().setHighlight({ color: e.target.value }).run(); }}
              className="w-4 h-4 cursor-pointer border-0 p-0 opacity-0 absolute"
            />
            <span style={{ display:'inline-block', width:12, height:4, background:highlightColor, borderRadius:2 }} />
          </label>

          <Btn onClick={() => editor.chain().focus().unsetColor().unsetHighlight().run()} title="Clear formatting">✕ Clear</Btn>
        </div>

        {/* Row 2: Lists, Align, Blocks, Link, Media, Emoji */}
        <div className="flex flex-wrap gap-2 items-center">
          <ToolGroup>
            <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>• List</Btn>
            <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>1. List</Btn>
            <Btn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')}>☑ Tasks</Btn>
          </ToolGroup>

          <Divider />

          <ToolGroup>
            <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign:'left' })}>⬅</Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign:'center' })}>⬛</Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign:'right' })}>➡</Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign:'justify' })}>☰</Btn>
          </ToolGroup>

          <Divider />

          <ToolGroup>
            <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>" Quote</Btn>
            <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>{'</>'} Code</Btn>
            <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>`code`</Btn>
            <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()}>── Rule</Btn>
          </ToolGroup>

          <Divider />

          <ToolGroup>
            <Btn onClick={setLink} active={editor.isActive('link')}>🔗 Link</Btn>
            {editor.isActive('link') && (
              <Btn onClick={() => editor.chain().focus().unsetLink().run()} danger>✕ Link</Btn>
            )}
          </ToolGroup>

          <Divider />

          <ToolGroup>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleUpload} />
            <Btn onClick={() => fileInputRef.current?.click()}>🖼 Image</Btn>
            <Btn onClick={() => { const url = prompt('YouTube URL:'); if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run(); }}>▶ YouTube</Btn>
          </ToolGroup>

          <Divider />

          {/* Emoji */}
          <div className="relative">
            <Btn onClick={() => setShowEmoji((v) => !v)} active={showEmoji}>😀 Emoji</Btn>
            {showEmoji && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-2  w-184">
                {EMOJIS.map((emoji) => (
                  <button key={emoji} type="button"
                    className="text-lg hover:bg-gray-100 rounded p-0.5 transition-colors"
                    onClick={() => { editor.chain().focus().insertContent(emoji).run(); setShowEmoji(false); }}
                  >{emoji}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Table */}
        <div className="flex flex-wrap gap-2 items-center">
          <Btn onClick={insertTable}>⊞ Insert Table</Btn>
          {editor.isActive('table') && (
            <>
              <Divider />
              <ToolGroup>
                <Btn onClick={() => editor.chain().focus().addColumnBefore().run()}>+ Col ←</Btn>
                <Btn onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Col →</Btn>
                <Btn onClick={() => editor.chain().focus().deleteColumn().run()} danger>✕ Col</Btn>
              </ToolGroup>
              <Divider />
              <ToolGroup>
                <Btn onClick={() => editor.chain().focus().addRowBefore().run()}>+ Row ↑</Btn>
                <Btn onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row ↓</Btn>
                <Btn onClick={() => editor.chain().focus().deleteRow().run()} danger>✕ Row</Btn>
              </ToolGroup>
              <Divider />
              <ToolGroup>
                <Btn onClick={() => editor.chain().focus().mergeCells().run()}>⊞ Merge</Btn>
                <Btn onClick={() => editor.chain().focus().splitCell().run()}>⊟ Split</Btn>
                <Btn onClick={() => editor.chain().focus().toggleHeaderRow().run()}>⊠ Header Row</Btn>
                <Btn onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>⊠ Header Col</Btn>
                <Btn onClick={() => editor.chain().focus().deleteTable().run()} danger>🗑 Delete Table</Btn>
              </ToolGroup>
            </>
          )}
        </div>
      </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-y-auto" onClick={() => setShowEmoji(false)}>
        <style>{`
          .ProseMirror table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 1em 0; overflow: hidden; }
          .ProseMirror td, .ProseMirror th { min-width: 1em; border: 2px solid #ced4da; padding: 8px 12px; vertical-align: top; box-sizing: border-box; position: relative; }
          .ProseMirror th { font-weight: 700; text-align: left; background-color: #f1f3f5; }
          .ProseMirror .selectedCell:after { z-index: 2; position: absolute; content: ""; left: 0; right: 0; top: 0; bottom: 0; background: rgba(99,102,241,0.15); pointer-events: none; }
          .ProseMirror .column-resize-handle { position: absolute; right: -2px; top: 0; bottom: 0; width: 4px; background-color: #6366f1; pointer-events: none; }
          .ProseMirror blockquote { border-left: 4px solid #6366f1; padding-left: 1em; color: #4b5563; font-style: italic; margin: 1em 0; }
          .ProseMirror pre { background: #1e1e2e; color: #cdd6f4; border-radius: 0.5em; padding: 1em 1.5em; font-family: 'Fira Code', monospace; overflow-x: auto; }
          .ProseMirror code { background: #f3f4f6; border-radius: 0.25em; padding: 0.1em 0.3em; font-size: 0.9em; }
          .ProseMirror ul[data-type="taskList"] { list-style: none; padding: 0; }
          .ProseMirror ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 8px; }
          .ProseMirror ul[data-type="taskList"] li > label { margin-top: 2px; }
          .ProseMirror img { max-width: 100%; height: auto; border-radius: 6px; }
          .ProseMirror hr { border: none; border-top: 2px solid #e5e7eb; margin: 1.5em 0; }
        `}</style>
        <EditorContent editor={editor} />
      </div>

      {/* STATUS BAR */}
      <div className="border-t border-gray-100 bg-gray-50 px-4 py-1.5 flex items-center justify-between text-xs text-gray-400 select-none">
        <span>{wordCount} {wordCount === 1 ? 'word' : 'words'} · {charCount} characters</span>
        <span className="text-indigo-400 font-medium">Blog Editor</span>
      </div>
    </div>
  );
}