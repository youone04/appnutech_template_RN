import {DataRegistrasi} from "config/Type/type"

export const formatMataUang = (data: bigint) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(data || 0)

}


export const formatNumber = (value: any) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const removeFormatting = (formattedValue: string) => {
    return formattedValue.replace(/[^0-9]/g, '');
};

export const validataForm = (data: DataRegistrasi) => {
    const invalidFields: (keyof DataRegistrasi)[] = [];
    Object.keys(data).forEach((item) => {
        const key = item as keyof DataRegistrasi;
        if (!data[key]) {
            invalidFields.push(key);
        }
    });
    return invalidFields
};