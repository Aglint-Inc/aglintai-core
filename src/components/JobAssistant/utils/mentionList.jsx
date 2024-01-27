/* eslint-disable react/display-name */

import React, {
    forwardRef, useEffect, useImperativeHandle,
    useState,
} from 'react'

export default forwardRef((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(null)
    const selectItem = index => {
        const item = props.items[Number(index)]

        if (item) {
            props.command({ id: item })
        }
    }

    const upHandler = () => {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
    }

    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % props.items.length)
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
        <div className="items">
            <style>


                {
                    `.items {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.9rem;
  overflow: hidden;
  padding: 0.2rem;
  position: relative;
}

.item {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  display: block;
  margin: 0;
  padding: 0.2rem 0.4rem;
  text-align: left;
  width: 100%;

  &.is-selected {
    border-color: #000;
  }
}`
                }
            </style>
            {props.items.length
                ? props.items.map((item, index) => (
                    <button
                        className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
                        key={index}
                        onClick={() => selectItem(index)}
                    >
                        {item}
                    </button>
                ))
                : <div className="item">No result</div>
            }
        </div>
    )
})