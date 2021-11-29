import { useState } from 'react';
import '../styles/header.scss'
import { TaskList } from './TaskList';

import { FiSun, FiMoon } from 'react-icons/fi'


export function Header() {

  const [theme, setTheme] = useState('light');

  function handleSetTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }  

  return (
    <div className={`body-content ${theme === 'light' ? 'theme-body-light' : 'theme-body-dark'}`}>
      <header className={`header ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
        <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
          <img src="/logo.svg" alt="to.do" />
          <button onClick={handleSetTheme} className="select-theme">{theme === 'light' ? <FiMoon className='light-icon'/> : <FiSun className='dark-icon'/>}</button>
        </div>
      </header>

      <TaskList th={theme} />
    </div>
  )
}