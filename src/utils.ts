export function clearFields(...fields: JQuery<HTMLElement>[]) {
    fields.forEach(field => {
        field.trigger('blur');
        field.val('');
    });
}

export function calcDaysDifference(date1: Date, date2: Date) {
    return Math.floor(
        Math.abs(date2.valueOf() - date1.valueOf()) / (1000 * 60 * 60 * 24)
    );
}

export function formatDatetime(
    date: Date,
    locale: string,
    options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }
): string {
    const daysAgo = calcDaysDifference(new Date(), date);

    if (!options.hour) {
        if (daysAgo === 0) return 'Today';
        else if (daysAgo === 1) return 'Yesterday';
        else if (daysAgo <= 7) return `${daysAgo} ago`;
    }

    const formattedDate = Intl.DateTimeFormat();

    return Intl.DateTimeFormat(locale, options).format();
}

export function formatCurrency(
    value: number,
    locale: string,
    currency: string
): string {
    return Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}
