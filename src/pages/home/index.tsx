import * as React from 'react'

function Home(props: any) {
    function toDemo() {
        props.history.push('/demo')
    }
    return (
        <div>
            Home
            <button onClick={toDemo}>
                to Demo
            </button>
        </div>
    )
}

export default Home