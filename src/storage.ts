
export const delItem = (key: string) => {
    localStorage.removeItem(key)
    return fetchStorage('TPS')
}

export const getItem = (key: string) => {
    const item = localStorage.getItem(key)
    return JSON.parse(item?? 'null')?.['TPS']
}

export const setItem = (key: string, item: string, payload: any) => {
    const items = getItem('TPS')
    const data = { ...items, [key]: { ...items?.[key], [item]: payload } }
    localStorage.setItem("TPS", JSON.stringify(data))
    return items
}

export const setObjectItem = (key: string, payload: Record<string, string>[]) => {
    const items = getItem('TPS');
    let data = items;
    if (data) {
        data = { ...items, [key as string]: { ...items?.[key], ...payload } };
    } else {
        data = { [key as string]: payload } as any;
    }
    localStorage.setItem('TPS', JSON.stringify(data));
    return data;
};

export const fetchStorage = (key: "TPS") => {
    const items = getItem(key)
    return items
}