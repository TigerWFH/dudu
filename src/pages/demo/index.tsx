import * as React from 'react'
const { dialog } = require('electron').remote

class Demo extends React.Component<any, never> {

    onDialog = () => {
        const result = dialog.showMessageBoxSync(null, {
            message: "同步弹框信息"
        })
        console.log("result===>", result)
    }
    render() {
        return (
            <div>
                Demo
                <button onClick={this.onDialog}>
                    弹框
                </button>
            </div>
        )
    }
}

export default Demo