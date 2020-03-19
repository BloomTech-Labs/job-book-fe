import React from "react";
import { Card, Image, Header, Icon } from "semantic-ui-react";

interface Props {
  Name: string;
  Year: string;
}

export const DashCard: React.FC<Props> = ({ Name, Year }) => {
  return (
    <>
      <Card>
        <Image src="https://picsum.photos/200" wrapped={true} ui={false} />
        <Card.Content>
          <Card.Header>{Name}</Card.Header>
          <Card.Meta>
            <span className="date">Born: {Year}</span>
          </Card.Meta>
          <Card.Description>{Name} is a fool...</Card.Description>
        </Card.Content>
        <Card.Content extra={true}>
          <a>
            <Icon name="user" />1 Friends
          </a>
        </Card.Content>
      </Card>
    </>
  );
};
