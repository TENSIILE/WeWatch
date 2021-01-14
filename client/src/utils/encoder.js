import base64 from "base-64"
import UTF8 from "utf-8"

import { randomRange } from '../utils/functions'

export class Racker {
    static reverseString(string) {
        return String(string).split('').reverse().join('')
    }

    static reverseIntExpectNumWithZeros(array) {
        return array.map(value => {
            if (String(value)[value.toString().length - 1] !== '0') {
                return Racker.reverseString(value)
            } else return value
        })
    }

    static splitByDigit(string, offset = 3) {
        const result   = []
        let string_gap = ''
        let counter    = 0

        string.split('').forEach(symbol => {
            string_gap += symbol
            counter++

            if (counter === offset) {
                result.push(string_gap)
                counter    = 0
                string_gap = ''
            }
        })

        return result
    }

    static moveLowToUpAndUpToLowCases(string) {
        return string
            .split('')
            .map(letter => {
                if (typeof letter === 'number') return letter
                if (letter === letter.toLowerCase()) {
                    return letter.toUpperCase()
                } else return letter.toLowerCase()
            })
            .join('')
    }

    static checkAndRemoveEqually(string) {
        if (string.includes('=')) {
            return string.slice(0, string.indexOf('='))
        }
        return string
    }

    static addSalt() {
        const letter      = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
        const LENGTH_SALT = 26
        let result_salt   = ""

        for (let i = 0; i < LENGTH_SALT; i++) {
            let randomNumber   = randomRange(0, letter.length - 1)
            let torn_out_value = letter[randomNumber]

            if (randomRange(0, 1)) torn_out_value = torn_out_value.toUpperCase()

            result_salt += torn_out_value
        }

        return result_salt
    }

    async encode(string_encode) {
        return new Promise(resolve => {
            const bytes         = UTF8.setBytesFromString(string_encode)

            const reverse_bytes = Racker.reverseIntExpectNumWithZeros(bytes)
            const updated_bytes = reverse_bytes
                .map(byte => String(byte).padStart(3, 0))
                .join('')
    
            const reverse_encoded    = Racker.reverseString(base64.encode(updated_bytes))
        
            const encoded_with_salt  = reverse_encoded + '.' + Racker.addSalt()
    
            const reverse_enc_w_salt = Racker.reverseString(encoded_with_salt)
    
            const swipe_case_encoded = Racker.moveLowToUpAndUpToLowCases(base64.encode(reverse_enc_w_salt))
    
            const bytes_encoded_b64  = UTF8.setBytesFromString(swipe_case_encoded)
    
            const reverse_convert_to_hex = Racker.reverseIntExpectNumWithZeros(
                bytes_encoded_b64.map(num => num.toString(35))
            ).join('')
    
            const final_minimaze_encode = Racker.checkAndRemoveEqually(Racker.moveLowToUpAndUpToLowCases(base64.encode(reverse_convert_to_hex)))
            
            
            resolve(final_minimaze_encode)
            // return final_minimaze_encode
        })
    }

    async decode(string_decode) {
        return new Promise(resolve => {
            const split_string                = Racker.splitByDigit(base64.decode(Racker.moveLowToUpAndUpToLowCases(string_decode)), 2)

            const reverse_back_convert_to_int = Racker.reverseIntExpectNumWithZeros(split_string)
    
            const convert_to_int              = reverse_back_convert_to_int.map(num => parseInt(num, 35))
                
            const swipe_case_decoded          = Racker.moveLowToUpAndUpToLowCases(UTF8.getStringFromBytes(convert_to_int))
            
            console.log('DECODE: ', convert_to_int, swipe_case_decoded)
            
    
            const reverse_decoded_with_salt   = Racker.reverseString(base64.decode(swipe_case_decoded))
    
            const decoded_without_salt        = reverse_decoded_with_salt.split('.')[0]
    
            const reverse_decoded             = Racker.reverseString(decoded_without_salt)
    
            const decoded_by_b64              = base64.decode(reverse_decoded)
    
            const split_array                 = Racker.splitByDigit(decoded_by_b64)
    
            const clearing_array              = split_array.map((num) => String(+num))
    
            const reverse_bytes               = Racker.reverseIntExpectNumWithZeros(clearing_array)
    
            const clear_value                 = UTF8.getStringFromBytes(reverse_bytes)
            
            resolve(clear_value)
            // return clear_value
        })
    }
}