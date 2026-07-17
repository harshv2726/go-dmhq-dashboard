"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Code2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}

function ToolbarButton({ active, disabled, onClick, label, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      // Buttons steal focus (and blur the editor's contenteditable) on
      // mousedown by default — prevent that so a toolbar click doesn't lose
      // the current selection before the command runs.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(active && "bg-muted text-foreground")}
    >
      {children}
    </Button>
  );
}

interface ToolbarProps {
  editor: Editor;
  isSourceMode: boolean;
  onToggleSourceMode: () => void;
}

function Toolbar({ editor, isSourceMode, onToggleSourceMode }: ToolbarProps) {
  function setLink() {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b p-1">
      <ToolbarButton
        label="Bold"
        disabled={isSourceMode}
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        disabled={isSourceMode}
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        disabled={isSourceMode}
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-3.5" />
      </ToolbarButton>
      <Separator orientation="vertical" className="mx-1 h-4" />
      <ToolbarButton
        label="Bullet list"
        disabled={isSourceMode}
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        disabled={isSourceMode}
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-3.5" />
      </ToolbarButton>
      <Separator orientation="vertical" className="mx-1 h-4" />
      <ToolbarButton
        label="Link"
        disabled={isSourceMode}
        active={editor.isActive("link")}
        onClick={setLink}
      >
        <LinkIcon className="size-3.5" />
      </ToolbarButton>
      <Separator orientation="vertical" className="mx-1 h-4" />
      <ToolbarButton
        label="Undo"
        disabled={isSourceMode || !editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={isSourceMode || !editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="size-3.5" />
      </ToolbarButton>
      <Separator orientation="vertical" className="mx-1 h-4" />
      <ToolbarButton label="Edit HTML source" active={isSourceMode} onClick={onToggleSourceMode}>
        <Code2 className="size-3.5" />
      </ToolbarButton>
    </div>
  );
}

interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

// A minimal WYSIWYG editor (bold/italic/lists/links) for product descriptions
// — stores HTML in the same string field the plain-text description used to
// use, so the storefront must render it with dangerouslySetInnerHTML (after
// sanitizing) rather than as plain text. See store-front's product page.
export function RichTextEditor({ id, value, onChange, placeholder, className }: RichTextEditorProps) {
  // Tracks the last HTML the editor itself emitted, so the sync effect below
  // can tell "value changed because we typed" apart from "value changed
  // because the parent reset it" — without that, a toolbar click (which
  // toggles focus) could race the effect and clobber in-progress typing.
  const lastEmitted = useRef(value);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceValue, setSourceValue] = useState(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        class:
          "min-h-32 px-3 py-2 text-sm outline-none [&_a]:underline [&_a]:text-primary [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p:not(:last-child)]:mb-2",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

  // Keep the editor in sync when `value` changes from outside (e.g. loading
  // an existing product), but never overwrite content the editor itself just
  // produced — only external resets should reach setContent.
  useEffect(() => {
    if (!editor || value === lastEmitted.current) return;
    lastEmitted.current = value;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  function toggleSourceMode() {
    if (!editor) return;
    if (isSourceMode) {
      // Leaving source mode: push the edited HTML into the editor and emit it.
      lastEmitted.current = sourceValue;
      editor.commands.setContent(sourceValue, { emitUpdate: false });
      onChange(sourceValue);
    } else {
      setSourceValue(editor.getHTML());
    }
    setIsSourceMode((prev) => !prev);
  }

  if (!editor) return null;

  return (
    <div className={cn("rounded-lg border border-input bg-transparent dark:bg-input/30", className)}>
      <Toolbar editor={editor} isSourceMode={isSourceMode} onToggleSourceMode={toggleSourceMode} />
      {isSourceMode ? (
        <Textarea
          id={id}
          value={sourceValue}
          onChange={(e) => setSourceValue(e.target.value)}
          placeholder={placeholder}
          className="min-h-32 resize-y rounded-none border-0 font-mono text-sm shadow-none focus-visible:ring-0"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
