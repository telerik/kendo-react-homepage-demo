import React from 'react';
export function АssignedTo(props) {
    return (
        <td>
            {props.dataItem.node.assignees.nodes.map((item, index) => {
                return <p key={index}><span><img src={item.avatarUrl} style={{ width: 30, height: 30 }} /></span> {item.name}</p>
            })}
        </td>
    )
}