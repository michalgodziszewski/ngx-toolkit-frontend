export interface ListPayload {
  [k: string]: any;
}

const findArrayKey = (obj: any) =>
  obj && typeof obj === 'object'
    ? (Object.keys(obj).find((k) => Array.isArray(obj[k])) ?? null)
    : null;

export function filterMockData(
  data: ListPayload,
  filters: Record<string, any> = {},
) {
  const k = findArrayKey(data);
  if (!k || !data[k]?.length) return data;
  let items = data[k] as any[];
  if (Object.keys(filters).length) {
    items = items.filter((item) =>
      Object.entries(filters).every(
        ([fk, fv]) =>
          (item as any)[decodeURIComponent(fk)] ==
          decodeURIComponent(String(fv)),
      ),
    );
  }
  return { items };
}

export function paginateMockData(
  data: ListPayload,
  pageNumber: number,
  pageSize: number,
) {
  const k = findArrayKey(data);
  if (!k || !data[k]?.length) return { [k ?? 'items']: [], rowCount: 0 };
  const start = (pageNumber - 1) * pageSize,
    end = pageNumber * pageSize;
  const items = (data[k] as any[]).slice(start, end);
  return { [k]: items, rowCount: (data[k] as any[]).length };
}

export function uuidv4(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
