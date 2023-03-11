import { EditorView, basicSetup } from 'codemirror';
// import {EditorView, keymap} from "@codemirror/view"
import { EditorState } from '@codemirror/state';
// import {defaultKeymap} from "@codemirror/commands"
import { html } from '@codemirror/lang-html';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';

import React, { useEffect, useRef } from 'react';
// import CodeMirror from './codemirror';

type TypeProps = {
  mode: 'htmlmixed';
  onChange: (value: string) => void;
  value?: string;
  readonly?: boolean;
  style?: any;
};

export function CodeEditor(props: TypeProps) {
  const ref = useRef(null);
  const startState = EditorState.create({
    doc: props.value,
    extensions: [
      basicSetup,
      html(),
      EditorView.updateListener.of(function (e) {
        const newValue = e.state.doc.toString();
        props.onChange(newValue);
      }),
      EditorView.lineWrapping,
      syntaxHighlighting(HighlightStyle.define([]))
    ]
  });

  useEffect(() => {
    // const addonOptions = {
    //   autoCloseBrackets: true,
    //   autoCloseTags: true,
    //   foldGutter: true,
    //   gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    // }
    // const editor = CodeMirror(ref.current, {
    //   value: '',
    //   mode: props.mode,
    //   theme: 'material',
    //   readOnly: props.readonly === true,
    //   tabSize: 2,
    //   lineWrapping: true,
    //   lineNumbers: true,
    //   ...addonOptions
    // });
    // editor.setValue(props.value || '');
    // editor.on('change', () => {
    //   props.onChange(editor.getValue());
    // })

    const view = new EditorView({
      state: startState,
      parent: ref.current
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="idraw-studio-codemirror">
      <div className="editor" style={props.style} ref={ref}></div>
    </div>
  );
}
