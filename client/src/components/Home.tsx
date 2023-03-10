import { useEffect, useState } from 'react'
import Store from './Store'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/auth.service'
import { getCurrentUser } from '../services/user.service'
import MyPokemons from './MyPokemons'

function Home() {
  const [activePanel, setActivePanel] = useState(0)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      navigate('login')
    }
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-100 relative">
      <div className="flex flex-col justify-center h-full gap-5">
        <div className="btn-group ">
          <button
            className={`btn gap-2 ${!activePanel && 'btn-active'}`}
            onClick={() => setActivePanel(0)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
            </svg>
            Starter Pokemons
          </button>
          <button
            className={`btn gap-2 ${activePanel && 'btn-active'}`}
            onClick={() => setActivePanel(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                clipRule="evenodd"
              />
            </svg>
            Shop
          </button>
        </div>
        {activePanel ? <Store /> : <MyPokemons />}
      </div>
      <div className="absolute bottom-5 right-5">
        <button
          className="btn btn-square btn-outline"
          onClick={() => handleLogout()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Home
