import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Nav() {
  return (
    <>
      <AppBar>
        <AppBarInner>
          <Link to="/">Home</Link>
          <Link to="/new">New</Link>
        </AppBarInner>
      </AppBar>
    </>
  )
}

const AppBarInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  a {
    color: white;
    text-decoration: none;
  }
`