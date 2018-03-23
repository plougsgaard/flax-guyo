import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/java'
import 'brace/theme/github'

let websocket

class App extends React.Component {
  state = {
    input: 'def f(): Int = 42333',
    output: {
      status: '',
      result: ''
    }
  }

  componentDidMount () {
    websocket = new window.WebSocket('ws://localhost:8004')
    websocket.onmessage = event => {
      this.setState({ output: JSON.parse(event.data) })
    }
  }

  handleSendMessage = () => {
    websocket.send(this.state.input)
  }

  render () {
    return (
      <div>
        <AceEditor
          style={{ width: '500px', height: '100px' }}
          mode='java'
          theme='github'
          onChange={input => this.setState({ input }, this.handleSendMessage)}
          value={this.state.input}
          editorProps={{ $blockScrolling: true }} />
        <h1>Output</h1>
        <p>Status: {this.state.output.status}</p>
        <p>Result: {this.state.output.result}</p>
      </div>
    )
  }
}

export default App
