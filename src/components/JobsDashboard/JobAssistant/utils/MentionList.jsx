/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import { Stack, Typography } from '@mui/material';
import {
    forwardRef, useEffect, useImperativeHandle,
    useState,
} from 'react';

import { useJobAssistantContext } from '@/src/context/JobAssistant';

import MuiAvatar from '../../../Common/MuiAvatar';


export default forwardRef((props, ref,) => {
    const { setIsPopUpOpen } = useJobAssistantContext()
    let listOfUsers = props.items
    // let listOfUsers = props.items.filter(ele => String(ele.first_name + ' ' + ele.last_name).toLowerCase().includes(String(props.text).toLowerCase().replaceAll('@', '')))
    const [selectedIndex, setSelectedIndex] = useState(null)
    const selectItem = index => {
        const level = listOfUsers[Number(index)]?.first_name + ' ' + listOfUsers[Number(index)]?.last_name
        const item = listOfUsers[Number(index)]?.application?.id

        if (item) {
            props.command({ id: item, label: level })

        }
    }

    const upHandler = () => {
        setSelectedIndex((selectedIndex + listOfUsers.length - 1) % listOfUsers.length)
        if (selectedIndex === 0) {
            document.getElementById('list-popup').scrollTop = document.getElementById('list-popup').scrollHeight
        } else {
            document.getElementById('list-popup').scrollTop -= 28.47
        }

    }

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % listOfUsers.length)
        if (selectedIndex + 1 === listOfUsers.length) {
            document.getElementById('list-popup').scrollTop = 0
        } else {
            document.getElementById('list-popup').scrollTop += 28.47
        }

    }

    const enterHandler = () => {
        selectItem(selectedIndex)
    }

    useEffect(() => setSelectedIndex(0), [props.items])

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
                upHandler()
                return true
            }

            if (event.key === 'ArrowDown') {
                downHandler()
                return true
            }

            if (event.key === 'Enter') {
                enterHandler()
                return true
            }

            return false
        },

    }))
    return (
        <Stack spacing={'10px'} id='list-popup' className="items">
            {listOfUsers.length
                ? listOfUsers.map((item, index) => (
                    <Stack
                        className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
                        direction={'row'} spacing={'8px'}
                        key={index}
                        onClick={() => { selectItem(index); setIsPopUpOpen(false); }}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <MuiAvatar fontSize='12px' width={20} height={20} level={item?.first_name} src={item.avater} />
                        <Stack >
                            <Typography variant='body1'>
                                {item.first_name + ' ' + item.last_name}
                            </Typography>
                        </Stack>
                    </Stack>
                ))
                : <div className="item">No result</div>
            }
        </Stack>
    )
})
