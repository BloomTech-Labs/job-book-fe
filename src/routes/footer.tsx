import React from "react";
import Styled from "styled-components";

const FooterDiv = Styled.div`
width:100%;
background:black;
color:white;
height:40px;
z-index:2;
bottom:0 !important;
position:fixed !important;

`;

function Footer() {
  return (
    <>
      <FooterDiv>
        <h1>jobbook</h1>
      </FooterDiv>
    </>
  );
}
export default Footer;
