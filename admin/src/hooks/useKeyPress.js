import { useState, useEffect } from "react"

export const useKeyPress = (keyTargetList, searchRef) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false)

    const upHandler = ({ key }) => {
        keyTargetList.forEach(keyTarget => {

            if (key === keyTarget) {
                setIsKeyPressed(true)
                searchRef.current.focus()
            }
        })
    }

    useEffect(() => {
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return isKeyPressed
}   
