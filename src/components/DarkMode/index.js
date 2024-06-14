import React from 'react';
import Toggle from '../Toggle';

function isDarkMode() {
  if (localStorage.getItem('color-theme')) {
    return localStorage.getItem('color-theme') === 'dark';
  } else {
    return document.documentElement.classList.contains('dark');
  }
}

function DarkMode() {
  const isDark = isDarkMode();
  const [label, setLabel] = React.useState(isDark ? 'Dark': 'Day');
  const handleCheckChange = (e) => {
    if (!e.target.checked) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setLabel('Day');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setLabel('Dark');
    }
  }

  return (
    <Toggle label={label} defaultChecked={isDark} handleCheckChange={handleCheckChange}/>
  )
}

export default DarkMode;