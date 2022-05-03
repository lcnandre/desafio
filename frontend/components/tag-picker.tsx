import { Component } from 'react';
import { Chip } from 'react-native-paper';
import AutocompleteTags from 'react-native-autocomplete-tags';
import { StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../reducers';
import { findTag, Tag } from '../services/tags';
import { setSearchText, setSelectedTags } from '../store/tags';

class TagPickerComponent extends Component<TagPickerProps> {
  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.filterSuggestions = this.filterSuggestions.bind(this);
  }

  onChange(items: any[]) {
    this.props.setSelectedTags(items);
    if (this.props.onChange) {
      this.props.onChange(items);
    }
  }

  filterSuggestions(query: string) {
    if (query && query.length >= 3 && query !== this.props.searchText) {
      this.props.setSearchText(query)
      this.props.findTag();
    }
    return this.props.tags;
  }

  render() {
    const renderTag = (tag: any, onPress: any) => {
      return (<Chip key={`tag-${tag.id}`} style={styles.tags} textStyle={styles.tagsText} onPress={onPress}>{tag.name}</Chip>);
    };

    return (
      <AutocompleteTags
        tags={this.props.selectedTags}
        suggestions={this.props.tags}
        labelExtractor={(item: any) => item.name}
        suggestionExtractor={(item: any) => item.name}
        filterSuggestions={this.filterSuggestions}
        onChangeTags={this.onChange}
        renderTag={renderTag}
        inputProps={{placeholder: this.props.placeholder, editable: this.props.editable}}
        inputStyle={styles.searchInput}
      />
    );
  }
}

const styles = StyleSheet.create({
  tags: {
    backgroundColor: '#fff',
    borderColor: '#ee4c78',
    borderRadius: 4,
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  tagsText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ee4c78',
  },
  searchInput: {
    height: 40,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
});

const mapState = (state: RootState) => ({
  loading: state.tagReducer.loading,
  tags: state.tagReducer.tags,
  selectedTags: state.tagReducer.selectedTags,
  searchText: state.tagReducer.searchText,
});

const mapDispatch = {
  findTag,
  setSearchText,
  setSelectedTags,
};

const connector = connect(mapState, mapDispatch);
interface TagPickerOwnProps {
  editable?: boolean;
  placeholder?: string;
  onChange?: (tags: Tag[]) => void;
}
type TagPickerProps = ConnectedProps<typeof connector> & TagPickerOwnProps;

export const TagPicker = connector(TagPickerComponent);
