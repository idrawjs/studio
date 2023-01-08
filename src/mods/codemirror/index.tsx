import React, { useEffect, useRef } from 'react';
// import CodeMirror from './codemirror';

type TypeProps = {
  mode: 'htmlmixed',
  onChange: (value: string) => void;
  value?: string,
  readonly?: boolean,
  style?: any
}

export function CodeEditor(props: TypeProps) {
  const ref = useRef(null);
  useEffect(() => {
    const addonOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    }
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
  }, []);

  return (
    <div className="idraw-studio-codemirror">
      <div className="editor" style={props.style} ref={ref}></div>
    </div>
  )
}