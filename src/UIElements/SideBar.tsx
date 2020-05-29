import React, { useState, useEffect } from "react";
import {
  Header,
  Image,
  Icon,
  Button,
  Menu,
  Ref,
  Segment,
  Sidebar,
  List
} from "semantic-ui-react";
import MapView from "./MapView";
import SideNavTab from "./SideNavTab";
import SearchAndFilter from "./SearchAndFilter";
export default function SideBar(props) {
  const [mapView, setMapView] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <Sidebar.Pushable
      style={{ height: "95%", overflowY: "hidden", minWidth: "1500px" }}
    >
      <div onMouseLeave={() => setVisible(false)}>
        <Sidebar
          as={Segment}
          animation="overlay"
          icon="labeled"
          direction="left"
          style={{
            paddingTop: "100px",
            overflowX: "hidden",
            width: "200px",
            background: "#fdfdfd"
          }}
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
        >
          <List selection>
            <h5>{`Welcome Back, ${props.user && props.user.firstName}`}</h5>
            <SearchAndFilter />
            <List.Item
              style={{
                fontSize: "1.2rem",
                color: "#333",
                textAlign: "center",
                marginTop: "5px"
              }}
              onClick={() => setMapView(!mapView)}
            >
              <Icon
                color={!mapView ? "orange" : "blue"}
                name={!mapView ? "map" : "columns"}
              />
              <List.Content>
                <List.Header>{!mapView ? "Map View" : "Kanban"}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item style={{ marginTop: "10px" }}>
              <Icon color={"blue"} name={"briefcase"} />
              <List.Content>
                <List.Header
                  style={{ textAlign: "center", fontSize: "1.2rem" }}
                >
                  {" "}
                  Find Jobs
                </List.Header>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://careerbuilder.com">
                  Career Builder
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://glassdoor.com">
                  Glassdoor
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a
                  target="_blank"
                  href="https://careers.google.com/jobs/results/"
                >
                  Google for Jobs
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://indeed.com">
                  Indeed
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://linkedin.com">
                  LinkedIn
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://monster.com">
                  Monster
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://snagajob.com">
                  Snag a Job
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://simplyhired.com">
                  Simply Hired
                </a>
              </List.Content>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Icon color={"blue"} name={"pin"} />
              <List.Content>
                <a target="_blank" href="https://ziprecruiter.com">
                  Zip Recruiter
                </a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Header style={{ textAlign: "center", fontSize: "1.2rem" }}>
                {" "}
                Cost of Living
              </List.Header>
            </List.Item>
            <List.Item style={{ textAlign: "center" }}>
              <Image
                style={{ width: "15px" }}
                src="https://a.omappapi.com/users/b7a235343fc6/images/db14e90f97e61563891076-04-Social-square-B.png"
              />

              <List.Content style={{ width: "91%" }}>
                <a
                  target="_blank"
                  href="https://www.bankrate.com/calculators/savings/moving-cost-of-living-calculator.aspx"
                >
                  Bankrate
                </a>
              </List.Content>
            </List.Item>
          </List>
        </Sidebar>
      </div>
      <Sidebar.Pusher>
        <>
          <SideNavTab setVisible={setVisible} />

          {!mapView ? props.children : <MapView />}
        </>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
