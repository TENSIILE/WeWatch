import React from 'react'
import { Input } from '../input/Input'
import { CatalogList } from '../catalogList/CatalogList'

export const RowInfo = ({label, value, isChange = false, onChange, text, setText, options}) => {
    return (
        <div className='row'>
            <div className='ceil'>{label}</div>
            {
                isChange && label === 'Языки:' ? (
                    <CatalogList 
                        label={label} 
                        value={value} 
                        onChange={onChange} 
                        text={text} 
                        setText={setText} 
                        list={options.languages}
                        setList={options.setLanguages}
                    />
                ) :
                isChange ?
                    <div className='ceil'>
                        <Input 
                            placeholder={value} 
                            newClass='grey-background' 
                            style={{width:'100%'}}
                            name={label}
                            onChange={onChange}
                            value={text}
                            maxLength={options.maxLengthСhangeDataProfile[label]}
                        />
                    </div>   
                        : <div className='ceil'>{value}</div>
            }
        </div>
    )
}