import { useGlobal } from '@/lib/global'
import { saveDarkModeToCookies } from '@/themes/theme'
import config from '../config'

export default function FloatDarkModeButton () {
  const { isDarkMode, updateDarkMode } = useGlobal()

  if (!config.WIDGET_DARK_MODE) {
    return <>dddd</>
  }

  // 用户手动设置主题
  const handleChangeDarkMode = () => {
    const newStatus = !isDarkMode
    saveDarkModeToCookies(newStatus)
    updateDarkMode(newStatus)
    const htmlElement = document.getElementsByTagName('html')[0]
    htmlElement.classList?.remove(newStatus ? 'light' : 'dark')
    htmlElement.classList?.add(newStatus ? 'dark' : 'light')
  }

  return (
    <div
      onClick={handleChangeDarkMode}
      className={'justify-center items-center w-10 h-10 text-center transform hover:scale-105 duration-200'
      }
    >
      <i id="darkModeButton" className={`${isDarkMode ? 'fa-sun' : 'fa-moon'} fas text-xs`}/>
    </div>
  )
}
