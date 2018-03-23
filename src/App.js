import React from 'react'

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


  handleSendMessage = e => {
    e && e.preventDefault && e.preventDefault()
    websocket.send(this.state.input)
  }
  render () {
    return (
      <div>
        <h1>Input</h1>
        <form onSubmit={this.handleSendMessage}>
          <input value={this.state.input} onChange={e => this.setState({ input: e.target.value }, this.handleSendMessage)} />
          <button onClick={this.handleSendMessage}>Click to send message</button>
        </form>
        <h1>Output</h1>
        <p>Status: {this.state.output.status}</p>
        <p>Result: {this.state.output.result}</p>
      </div>
    )
  }
}

export default App
