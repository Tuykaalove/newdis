import Link from "next/link";
import { useUser } from "lib/hooks";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

const Header = () => {
  const user = useUser();

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link href="/change" passHref>
          <Nav.Link>Нууц үг солих</Nav.Link>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/api/user/logout" passHref>
          <Nav.Link>Гарах</Nav.Link>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <header>
      <Navbar bg="primary" fixed="top">
        <Container>
          {user ? (
            <>
              <Nav className="me-auto">
                <Link href="/report" passHref>
                  <Nav.Link style={{ color: "white", fontWeight: "bold" }}>
                    Тайлан
                  </Nav.Link>
                </Link>
                <Link href="/water/water" passHref>
                  <Nav.Link style={{ color: "yellow", fontWeight: "bold" }}>
                    Ус хангамж
                  </Nav.Link>
                </Link>
                <Link href="/water/wwtp" passHref>
                  <Nav.Link style={{ color: "yellow", fontWeight: "bold" }}>
                    Цэвэрлэх
                  </Nav.Link>
                </Link>
                <Link href="/table/task" passHref>
                  <Nav.Link style={{ color: "white", fontWeight: "bold" }}>
                    Үүрэг даалгавар
                  </Nav.Link>
                </Link>
                <Link href="/table/nextday" passHref>
                  <Nav.Link style={{ color: "white", fontWeight: "bold" }}>
                    Ажлын захиалга
                  </Nav.Link>
                </Link>
                <Link href="/table/car" passHref>
                  <Nav.Link style={{ color: "white", fontWeight: "bold" }}>
                    Машин захиалга
                  </Nav.Link>
                </Link>
                <Link href="/table/setcar" passHref>
                  <Nav.Link style={{ color: "white", fontWeight: "bold" }}>
                    Ажилд гарах машин, механизм
                  </Nav.Link>
                </Link>
                <Link href="/table/burning" passHref>
                  <Nav.Link style={{ color: "white", fontWeight: "bold" }}>
                    Горим
                  </Nav.Link>
                </Link>
              </Nav>
              <Link href="/daynews" passHref>
                <Nav.Link style={{ color: "yellow", fontWeight: "bold" }}>
                  Ажлын мэдээ
                </Nav.Link>
              </Link>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {renderMenu}
            </>
          ) : (
            <h4 style={{ color: "white", fontWeight: "bold" }}>
              УСУГ-ын өдөр тутмын мэдээ
            </h4>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
