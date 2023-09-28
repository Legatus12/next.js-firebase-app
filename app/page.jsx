import Link from "next/link"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

//

export default function HomePage() {
    return(
        <div className="frame center-y">
            <p>This is your home page.</p>
            <br />
            <Link className="link" href={'/login'}>
                <span className="mr-2">login</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <br />
            <Link className="link" href={'/signup'}>
                <span className="mr-2">signup</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    )
}