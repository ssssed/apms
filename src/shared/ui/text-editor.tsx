"use client";

import React, { useState, useCallback } from "react";
import { createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "This is your new Slate editor. Start typing..." }],
  },
];

export function TextEditor() {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "paragraph":
        return <p {...props.attributes}>{props.children}</p>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <span {...props.attributes}>{props.children}</span>;
  }, []);

  return (
    <div className="p-4 border rounded">
      <Slate
        editor={editor}
        initialValue={value} // Используем initialValue вместо value
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Type something..."
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
}
