import { pickFile } from 'idraw';

function readFile(file: File): Promise<FileReader> {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader);
    };
    reader.onerror = reject;
    if (file.type === 'application/json') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

export function pickJSONFile(opts: { success?: (e: { json: any }) => void; error?: (err: Error) => void }) {
  pickFile({
    accept: 'application/json',
    success: async (e) => {
      const reader = await readFile(e.file);
      const result = reader.result;
      if (typeof result === 'string') {
        try {
          const json = JSON.parse(result);
          opts?.success?.({ json });
        } catch (err: any) {
          opts?.error?.(err);
        }
      } else {
        opts?.error?.(Error('ERROR_PICK_FILE_FAIL'));
      }
    },
    error: opts?.error
  });
}
