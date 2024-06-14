import _ from 'lodash';
import React, { useState } from 'react';
import { useHistory, withRouter } from "react-router-dom";

function Tab(props) {
  const totalSpace = 10; // 10%, sum of spaces between tabs
  const oneBlock = (100 - totalSpace) / props.count;
  const space = totalSpace / (props.count - 1);
  const calcLeft = (oneBlock + space) * props.newIndex;
  return (
    <div
      className={`absolute cursor-pointer rounded-[7px] tracking-[-1px] md:tracking-normal pt-2 pb-2 pl-0 md:p-2 text-center text-[11px] md:text-[16px] ${props.isSelected ? 'drop-shadow-[0_0px_4px_#1199FA] bg-[#F3F3FB] dark:bg-[#271B2D] text-[#1199FA]' : 'bg-[#EFEFFB] dark:bg-[#32283C] text-[#7887A0B0]'}  transition-all duration-[500ms]`}
      style={{left: calcLeft + '%', width: oneBlock + '%'}}
      onClick={props.handleClick.bind(this, props.newIndex)}
    >
      {props.title}
    </div>
  )
}

const AnimatedTab = withRouter(props => {
  let history = useHistory();
  let defaultPositions = [];
  let currentSelected = 0;
  if (props.onChange) {
    for (let i = 0; i < props.tabs.length; i++) {
      if (props.tabs[i].value === props.selected) {
        currentSelected = i;
      }
      defaultPositions.push(i);
    }
  } else { // header
    for (let i = 0; i < props.tabs.length; i++) {
      if (props.tabs[i].url.toLowerCase() === props.location.pathname) {
        currentSelected = i;
      }
      defaultPositions.push(i);
    }
  }
  
  const [ positions, setPositions ] = useState(defaultPositions);

  const handleClick=(dest) => {
    if (dest !== currentSelected) { // reset position
      let newPositions = [];
      for (let i = 0; i < positions.length; i++) {
        let newPos = positions[i];
        if (newPos === currentSelected) {
          newPos = dest;
        } else {
          if (dest < currentSelected) {
            if (newPos >= dest && newPos < currentSelected) {
              newPos++;
            }
          } else {
            if (newPos > currentSelected && newPos <= dest) {
              newPos--;
            }
          }
        }
        newPositions.push(newPos);
      }

      if (props.onChange) {
        props.onChange(props.tabs[dest].value);
      } else { // header
        history.push(props.tabs[dest].url);
      }
      setPositions(newPositions);
    }
  }

  return (
    <div className={`w-full h-[50px] md:h-[74px] p-[6px] md:p-4 rounded-[14px] bg-[#E5E9ED] dark:bg-[#2A1B31] drop-shadow-[0_0px_7px_rgba(116,95,242,0.28)] border-2 dark:border-transparent ${props.className || ''}`}>
      <div className='w-full relative'>
        {_.map(props.tabs, (tab, index) => {
          return <Tab key={index} count={props.tabs.length} title={props.tabs[positions[index]].title} newIndex={positions[index]} handleClick={handleClick} isSelected={positions[index] === currentSelected}/>
        })}
      </div>
    </div>
  );

});

export default AnimatedTab;