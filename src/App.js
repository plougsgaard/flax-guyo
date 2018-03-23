import React from 'react'
import AceEditor from 'react-ace'
import Button from 'material-ui/Button'
import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'

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
      <Grid container={true} spacing={24}>
        <Grid item xs={12} md={6}>
          <Card>
            <AceEditor
              style={{ width: '100%', height: '100px' }}
              mode='java'
              theme='github'
              onChange={input => this.setState({ input }, this.handleSendMessage)}
              value={this.state.input}
              editorProps={{ $blockScrolling: true }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Button variant='fab' color='secondary'>Magnus</Button>
              <Button variant='raised' color='primary'>Magnus</Button>
              <h1>Output</h1>
              <p>Status: {this.state.output.status}</p>
              <p>Result: {this.state.output.result}</p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default App
