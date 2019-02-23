import React from "react";
import { Button, Text, Card, theme } from "@aragon/ui";
import styled from "styled-components";

const CardContainer = styled(Card)`
  visibility: ${props => props.visibility};
  background-color: ${props => props.background};
  height: 50px;
  width: 500px;
`;

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: theme.gradientStart,
      text: "",
      visibility: this.props.visibility
    };
  }

  render() {
    let zero = "0x0000000000000000000000000000000000000000";
    let bg;
    let text = "This node";
    if (this.props.ethAddr !== zero && this.props.ethAddr !== "") {
      text = text + " is on list";
      bg = theme.positive;
    } else {
      text = text + " is not on list";
      bg = theme.negative;
    }
    return (
      <div>
        <CardContainer visibility={this.props.visibility} background={bg}>
          <Text>{text}</Text>
        </CardContainer>
      </div>
    );
  }
}
