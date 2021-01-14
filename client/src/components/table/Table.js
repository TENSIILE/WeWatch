import React from 'react'
import classnames from 'classnames'

import './table.scss'

export const Table = ({ 
    newClass,
    isHeader,
    header,
    count, 
    children
}) => {
    return (
        <div className={classnames("table-information", [newClass])}>
            {
                isHeader && (
                    <div 
                        className="row header" 
                        style={{gridTemplateColumns: '1fr '.repeat(count)}}
                    >
                        {
                            header && header.map((item, i) => (
                                <div 
                                    key={i} 
                                    className="ceil"
                                >
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {children}
        </div>
    )
}

Table.Row = ({ 
    children,
    count,
    gridTemplateColumns = null
}) => (
    <div 
        className="row" 
        style={{gridTemplateColumns: gridTemplateColumns ? gridTemplateColumns : '1fr '.repeat(count)}}
    >
        {children}
    </div>
)

Table.Ceil = ({ children }) => <div className='ceil'>{children}</div>