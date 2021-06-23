
export function pickFile (opts: {
  success: (data: { file: File }) => void;
  error?: (err: ErrorEvent) => void;
}) {
  const { success, error } = opts;
  let input = document.createElement('input');
  input.type = 'file';
  input.addEventListener('change', function() {
    const file: File = this.files[0];
    success({
      file: file,
    });
    input = null;
  });
  input.addEventListener('error', function(err) {
    if (typeof error === 'function') {
      error(err);
    }
    input = null;
  })
  input.click();
}

export function parseFileToBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    reader.addEventListener('load', function() {
      resolve(this.result);
      reader = null;
    });
    reader.addEventListener('error', function(err) {
      // reader.abort();
      reject(err);
      reader = null;
    });
    reader.addEventListener('abort', function() {
      reject(new Error('abort'));
      reader = null;
    })
    reader.readAsDataURL(file);
  })
} 

export function parseFileToText(file: File): Promise<string | ArrayBuffer> {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    reader.addEventListener('load', function() {
      resolve(this.result);
      reader = null;
    });
    reader.addEventListener('error', function(err) {
      // reader.abort();
      reject(err);
      reader = null;
    });
    reader.addEventListener('abort', function() {
      reject(new Error('abort'));
      reader = null;
    })
    reader.readAsText(file);
  })
} 