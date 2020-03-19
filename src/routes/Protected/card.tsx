import React from "react";
import { Card, Image, Header, Icon } from "semantic-ui-react";

export default function DashCard(props) {
  return (
    <>
      <Card>
        <Image src="https://picsum.photos/200" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>
            <span className="date">Born: {props.year}</span>
          </Card.Meta>
          <Card.Description>{props.name} is a fool...</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />0 Friends
          </a>
        </Card.Content>
      </Card>
    </>
  );
}
