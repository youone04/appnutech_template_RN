import {DataRegistrasi, DataLogin} from "config/Type/type"

export const formatMataUang = (data: number|bigint) => {
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

type Data = DataRegistrasi | DataLogin;

export const validataForm = (data: Data) => {
    const invalidFields: (keyof Data)[] = [];
    Object.keys(data).forEach((item) => {
        const key = item as keyof Data;
        if (!data[key]) {
            invalidFields.push(key);
        }
    });
    return invalidFields
};

export const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
