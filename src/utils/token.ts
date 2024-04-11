import { jwtDecode } from 'jwt-decode'

export const isJwtTokenExpired = (token: string) => {
    const tokenData: any = jwtDecode(token)
    const currentDate = new Date()
    const timestamp = currentDate.getTime()
    const time = timestamp / 1000 // converting milliseonds to seconds
    const tokenExpireTime = tokenData.exp - Number(import.meta.env.VITE_APP_10_MINUTES_IN_SECONDS) // refresh token when less than 10 minutes are left
    return parseInt(time.toString(), 10) > tokenExpireTime;
}


export const decodeToken = (token: string)=>{
    return jwtDecode(token);
}