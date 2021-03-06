// Imports 
import * as React from 'react';
import {withTheme} from 'styled-components'
import {Grid} from './styles'
import {UpGridProps, LayoutMode} from './'
import * as classNames from 'classnames'
import * as assign from 'object-assign'
import defaultTheme from '../../../Common/theming'

class UpGrid extends React.Component<UpGridProps, any> {
  
  public static defaultProps : UpGridProps = {
      gutter:0,
      theme:defaultTheme
  }

  render() {
    const { children, type, gutter } = this.props;
    var rows = children ;
    const _gutter = gutter != null ? gutter : (this.props.theme.gridGutter != null ? this.props.theme.gridGutter : 0) ;
    if(_gutter > 0 || type != 'float') {
        rows = React.Children.map(children, (row: React.ReactElement<any>) => {
        if (!row) {
            return null;
        }
        if (row.props) {
            return React.cloneElement(row, {
                gutter: row.props.gutter==0 ? _gutter : row.props.gutter,
                type: row.props.type? row.props.type : row.props.type
            });
        }
        return row;
        });
    }
    return (
        <Grid style={this.props.style}>
            {rows}
        </Grid>
    );
  }
}

export default withTheme(UpGrid) 