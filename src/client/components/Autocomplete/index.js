import React, {Component} from 'react'
import Autocomplete from 'react-autocomplete'
import './styles.css'

export default class ReactAutocomplete extends Component {
  state = {
    value: ''
  }

  render() {
    return (
      <div className="autocomplete">
        <Autocomplete
          getItemValue={(item) => item.label}
          items={[
            { label: 'apple' },
            { label: 'banana' },
            { label: 'pear' }
          ]}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.label}
            </div>
          }
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}
          onSelect={(value) => this.setState({value})}
        />
      </div>
    )
  }
}
