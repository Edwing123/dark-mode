type User = {
  id: string | number
  name: string
  age: number
  country: string
}

const users: User[] = [
  {
    id: 1,
    name: "Edwing123",
    age: 18,
    country: "Nicaragua"
  },
  {
    id: 2,
    name: "Joseph",
    age: 22,
    country: "Costa Rica"
  },
  {
    id: 3,
    name: "Yader",
    age: 9,
    country: "Nicaragua"
  },
  {
    id: 4,
    name: "Abdiel",
    age: 4,
    country: "Nicaragua"
  },
  {
    id: 5,
    name: "Scarleth",
    age: 18,
    country: "Nicaragua"
  },
  {
    id: 6,
    name: "Anonymous",
    age: 0,
    country: "Anonymous"
  },
  {
    id: 7,
    name: "John Doe",
    age: 28,
    country: "United States"
  },
  {
    id: 8,
    name: "@Edwing123",
    age: 18,
    country: "Nicaragua"
  }
]

function createUserProfile({ id, name, age }: User): HTMLDivElement {
  const userProfileEl: HTMLDivElement = document.createElement("div")
  const userProfileHeading: HTMLHeadingElement = document.createElement("h4")
  const userAgeEl: HTMLDivElement = document.createElement("div")

  userProfileEl.classList.add("userProfile")
  userProfileHeading.classList.add("userProfileHeading")
  userAgeEl.classList.add("userProfileAge")
  userProfileEl.id = id.toString() // id attribute is of type number

  userProfileHeading.textContent = `My name is ${name}`
  userAgeEl.textContent = age.toString()

  userProfileEl.appendChild(userProfileHeading)
  userProfileEl.appendChild(userAgeEl)

  return userProfileEl
}

function createThemeLink(theme: string, source: string): HTMLLinkElement {
  const themeLink: HTMLLinkElement = document.createElement("link")

  themeLink.dataset.themeId = theme
  themeLink.rel = "stylesheet"
  themeLink.href = `${source}${theme}-mode.css`

  return themeLink
}

function loadDarkMode(): void {
  const darkModeLink: HTMLLinkElement = createThemeLink("dark", "./dist/css/themes/")
  // const comment = document.createComment("dynamicly inserted stylesheet for themes") // new Comment("comment text")

  // document.head.appendChild(comment)
  document.head.appendChild(darkModeLink)
}

function removeDarkMode(): void {
  const darkModeLink: HTMLLinkElement | null = document.querySelector("[data-theme-id='dark']")

  if (darkModeLink && darkModeLink.parentNode) {
    darkModeLink.parentNode.removeChild(darkModeLink)
  }
}

function getThemeModeFromLocalStorage (): string | null {
  const themeMode: string | null = localStorage.getItem("theme-mode")

  return themeMode
}

function setThemeModeToLocalStorage (mode: string): void {
  localStorage.setItem("theme-mode", mode)
}

function main(): void {
  users.forEach((user) => {
    const userProfile: HTMLDivElement = createUserProfile(user)
    const usersEl = document.getElementById("users")

    if (usersEl) {
      usersEl.appendChild(userProfile)
    }
  })

  window.addEventListener("DOMContentLoaded", (): void => {
    const themeSwitcher: HTMLInputElement | null = document.querySelector("#themeSwitcher")

    /*
    const themeMode: string | null = getThemeModeFromLocalStorage()
    let defaultTheme: string = "light"

    if (themeMode) {
      if (themeMode === "dark") {
        loadDarkMode()
        themeSwitcher.checked = true
      } else if (themeMode === "light") {
        removeDarkMode()
        themeSwitcher.checked = false
      }
    } else {
      setThemeModeToLocalStorage(defaultTheme)
    }
    */

    if (themeSwitcher) {
      themeSwitcher.addEventListener("change", (event): void => {
        let checkboxEl = event.target

        if (checkboxEl) {
          // false for normal-mode, true for dark-mode
          const modeState: boolean = checkboxEl.checked

          if (modeState === true) {
            loadDarkMode()
            setThemeModeToLocalStorage("dark")
          } else {
            removeDarkMode()
            setThemeModeToLocalStorage("light")
          }
        }
      })
    }
  })
}


const SHOULD_RUN: boolean = true as boolean
if (SHOULD_RUN) {
  main()
}
