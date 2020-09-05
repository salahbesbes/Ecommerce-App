import _ from "lodash";
import faker from "faker";
import React, { Component } from "react";
import { Button, Dropdown, Grid, Header } from "semantic-ui-react";

const getOptions = () =>
  _.times(3, () => {
    const name = faker.name.findName();
    return { key: name, text: name, value: _.snakeCase(name) };
  });

class FilterType extends Component {
  state = {
    isFetching: false,
    multiple: true,
    search: true,
    searchQuery: null,
    value: [],
    options: getOptions(),
  };

  handleChange = (e, { value }) => this.setState({ value });
  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  fetchOptions = () => {
    this.setState({ isFetching: true });

    setTimeout(() => {
      this.setState({ isFetching: false, options: getOptions() });
      this.selectRandom();
    }, 500);
  };
  selectRandom = () => {
    const { multiple, options , searchQuery} = this.state;


    const value = _.sample(options).value;
    this.setState({ value: multiple ? [value] : value });
  };
    
  render() {
    const { multiple, options, isFetching, search, value } = this.state;
    return (
      <Grid>
        <Grid.Column width={8}>
          <Button onClick={this.fetchOptions}>Fetch</Button>

          <Dropdown
            fluid
            selection
            multiple={multiple}
            search={search}
            options={options}
            value={value}
            placeholder="Add Users"
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            disabled={isFetching}
            loading={isFetching}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default FilterType;
