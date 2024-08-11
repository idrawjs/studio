export type ClipboardReadItem = {
  file?: File | null;
  text?: string | null;
  type: 'file' | 'text' | null;
};

export async function parseClipboardReadList(e: ClipboardEvent | null): Promise<ClipboardReadItem[]> {
  const items: DataTransferItemList = (e?.clipboardData?.items || []) as DataTransferItemList;

  const list: ClipboardReadItem[] = [];
  const isFinish = () => list.length >= items.length;

  return new Promise((resolve) => {
    const done = () => {
      if (isFinish() === true) {
        const result: ClipboardReadItem[] = Array.from(list as any);
        resolve(result);
      }
    };
    Array.from(items).forEach((item: DataTransferItem, i: number) => {
      if (item.kind === 'file') {
        const readItem: ClipboardReadItem = {
          file: null,
          text: null,
          type: null
        };
        const file = item.getAsFile();
        readItem.type = 'file';
        readItem.file = file;
        list[i] = readItem;
        done();
      } else if (item.kind === 'string') {
        item.getAsString((text) => {
          const readItem: ClipboardReadItem = {
            file: null,
            text: null,
            type: null
          };
          readItem.type = 'text';
          readItem.text = text;
          list[i] = readItem;
          done();
        });
      }
    });
  });
}
