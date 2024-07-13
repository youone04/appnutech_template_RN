import { validateEmail } from "@helper/func"
import { Text } from "react-native"
interface DataShowNotifProps {
    dataNotValid?: any
    value?: string;
    id?: string
    isNull?: boolean
    valuePassword?: any,
    konfirmasiPW?: boolean,
    isPassword?: boolean,
    isEmail?: boolean,
}

const ShowNotifField: React.FC<DataShowNotifProps> = (data) => {
    return (
        <>
            {
                data.dataNotValid.includes(data.id) && data.isNull ?
                    <Text style={{
                        color: 'red',
                        right: 6,
                        bottom: 0,
                        position: 'absolute'
                    }}>field tidak boleh kosong</Text> :
                    data.isEmail && data.value && !validateEmail(data.value) ?
                        <Text style={{
                            color: 'red',
                            right: 6,
                            bottom: 0,
                            position: 'absolute'
                        }}>email tidak sesuai format</Text> :
                        data.isPassword && data.value && data.value?.length < 8 ?
                            <Text style={{
                                color: 'red',
                                right: 6,
                                bottom: 0,
                                position: 'absolute'
                            }}>panjang karakter minimal 8</Text> :
                            data.konfirmasiPW && (data.value !== data.valuePassword) ?
                                <Text style={{
                                    color: 'red',
                                    right: 6,
                                    bottom: 0,
                                    position: 'absolute'
                                }}>password tidak sama</Text> : null
            }
        </>
    )
}
export default ShowNotifField;