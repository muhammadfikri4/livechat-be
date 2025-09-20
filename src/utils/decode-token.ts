import {decode} from 'jsonwebtoken'
import { TokenDecodeInterface } from '../interface'
 
export const decodeToken = (token: string) => decode(token) as TokenDecodeInterface