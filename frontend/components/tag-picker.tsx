import { Component } from 'react';
import SelectBox from 'react-native-multi-selectbox';
import { StyleSheet } from 'react-native';
import { xorBy } from 'lodash';

export default class TagPicker extends Component {
  private styles = StyleSheet.create({
    selectedItem: {
      backgroundColor: '#000 !important',
      fontSize: '200px',
    }
  });

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {selectedTags: []};
  }

  onChange(item: any) {
    this.setState({selectedTags: xorBy(this.state.selectedTags, [item], 'id')});
  }

  render() {
    const tags = [
      { item: 'Tag 1', id: '1' },
      { item: 'Tag 2', id: '2' },
      { item: 'Tag 3', id: '3' },
      { item: 'Tag 4', id: '4' },
      { item: 'Tag 5', id: '5' },
    ];

    return (
      <SelectBox
        options={tags}
        selectedValues={this.state.selectedTags}
        onMultiSelect={this.onChange}
        onTapClose={this.onChange}
        label=''
        inputPlaceholder='Adicione uma categoria (opcional)...'
        selectIcon={<></>}
        multiOptionContainerStyle={this.styles.selectedItem}
        isMulti
      />
    );
  }
}
