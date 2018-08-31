import styled from '../..';
import * as React from 'react'

const Input = styled.input.attrs({
  // we can define static props
  type: 'password',

  // or we can define dynamic ones
  margin: (props) => props.size as string || '1em',
  padding: (props) => props.size as string || '1em'
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${(props) => props.margin};
  padding: ${(props)  => props.padding};
`;

const InputComp: React.SFC<{
  num: number
  str: string
}> = () => null

const InputFullAttrsProps = styled(InputComp).attrs(() => ({
  num: 10,
  str: '20'
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${(props) => props.num};
  padding: ${(props)  => props.num};
`;

 <InputFullAttrsProps /> // should not require any props since they're being provided in attrs

const InputPartialAttrsProps = styled(InputComp).attrs(() => ({
  num: 10,
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${(props) => props.num};
  padding: ${(props)  => props.num};
`;

 <InputPartialAttrsProps str="test" /> // should require str props since num is provided in attrs
