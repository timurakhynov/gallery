import { MouseEventHandler } from "react"

export default interface IModalProps {
    show: boolean
    image: string
    closed: React.MouseEventHandler<HTMLDivElement>
    title: string
}