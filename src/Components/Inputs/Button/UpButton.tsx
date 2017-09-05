// Imports
import * as React from 'react';
import { BaseButton} from './styles';
import { UpButtonProps } from './';
import  UpTooltip, {Tooltip} from '../../Display/Tooltip' ;
import defaultTheme from '../../../Common/theming'
import {isString} from '../../../Common/utils'

// Exports
export default class UpButton extends React.Component<UpButtonProps, undefined> {

  constructor(props) {
    super(props) ;
    this.handleClick = this.handleClick.bind(this);
  }

  public static defaultProps: UpButtonProps = {
    backgroundColor: '',
    borderColor: '',
    fontSize: 'large',
    disabled:false,
    shadow:false,
    iconName:false,
    iconSize:20,
    intent:'default',
    width: 'normal',
    height: 'normal',
    tooltip:null,
    onClick:(e:React.MouseEvent<HTMLButtonElement>) => {},
    theme:defaultTheme
  };

  private handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
      this.props.onClick(e);
      e.preventDefault();
      e.stopPropagation();
  }

  public render() {
    const {children, tooltip, onClick, ...others} = this.props ;
    
    if(tooltip) {
      var _tooltip:Tooltip ;
      if(isString(tooltip)) {
        _tooltip = {
          content : tooltip as string
        }
      } else {
        _tooltip = tooltip as Tooltip ;
      }
      return (
        <UpTooltip {..._tooltip}>
          <BaseButton onClick={this.handleClick} {...others}>
            <span>{children}</span>
          </BaseButton>
        </UpTooltip>
      );
    } else {
      return (
        <BaseButton onClick={this.handleClick} {...others}>
          <span>{children}</span>
        </BaseButton>
      );
    }
  }
}