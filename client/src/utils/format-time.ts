export const formatTime = (data: Date): string => {
    if (!(data instanceof Date) || isNaN(data.getTime())) {
        return 'Invalid Date';
    }

    const pad = (num: number): string => String(num).padStart(2, '0');

    const date = pad(data.getDate());
    const month = pad(data.getMonth() + 1);
    const year = data.getFullYear();
    const hour = pad(data.getHours());
    const minutes = pad(data.getMinutes());

    return `${date}-${month}-${year} / ${hour} : ${minutes}`;
};
