import * as React from 'react';
import {style} from 'typestyle';
import {ThemedProps, IntentType} from '../../../Common/theming/types' 
import {withTheme} from 'styled-components'

export type WidthSize = 'auto' | 'small' | 'medium' | 'large' | 'xlarge' ;
export type Align = 'left' | 'right'  ;

export interface UpBadgeProps extends ThemedProps {
  text:string;
  color?:string;
  background?:string;
  rounded?:boolean;
  intent?:IntentType;
};
 
class UpBadge extends React.Component<UpBadgeProps, {}> {
  
  public static defaultProps: UpBadgeProps = {
    text:'',
    color:'#FFF',
    background:"black",
    rounded:false
  }

  constructor(props) {
    super(props) ;
  }

  render() {
      const {children, text, color, background, ...others} = this.props ; 
      var fontColor = color ;
      var backgroundColor = background ;

      if(this.props.intent !== null) {
          fontColor = this.props.theme.colorMap[`${this.props.intent}Fg`] ;
          backgroundColor = this.props.theme.colorMap[`${this.props.intent}`] ;
      }

      const BadgeStyle = style({
        borderRadius: (this.props.rounded===true)? '18px':'6px',
        padding:(this.props.rounded===true)? "7px 11px" : '6px;',
        fontWeight : 700,
        color: fontColor,
        display:'inline-block',
        width:(this.props.rounded===true)? '32px':'auto',
        backgroundColor:backgroundColor
      }) ;

      return (
        <span className={BadgeStyle}>
          {text}
          {children}
        </span>
      ) ;
  }
}

export default withTheme(UpBadge)