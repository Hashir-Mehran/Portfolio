import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";

/* ========== STYLES ========== */

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColorText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 32px;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  list-style: none;
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  padding: 24px 40px;
  background: ${({ theme }) => theme.card_light + "ee"};
  display: flex;
  flex-direction: column;
  gap: 20px;

  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: all 0.4s ease;
  z-index: ${({ isOpen }) => (isOpen ? 1000 : -1)};
`;

/* 🔥 MOBILE LINK STYLE */
const MobileNavLink = styled(NavLink)`
  font-size: 18px;
  padding: 10px 0;
`;

const LeftLink = styled(MobileNavLink)`
  text-align: left;
`;

const RightLink = styled(MobileNavLink)`
  text-align: right;
`;

/* 🔥 Mobile links grid */
const MobileLinkGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

/* 🔥 Education center */
const CenterLink = styled(MobileNavLink)`
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 600;
`;

/* 🔥 Mobile buttons grid */
const MobileButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

/* ========== COMPONENT ========== */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        {/* LOGO */}
        <NavLogo to="/">
          <ColorText>&lt;</ColorText>
          Hashir
          <span style={{ color: theme.primary }}>/</span>
          Mehran
          <ColorText>&gt;</ColorText>
        </NavLogo>

        {/* MOBILE ICON */}
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded />
        </MobileIcon>

        {/* DESKTOP LINKS */}
        <NavItems>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
        </NavItems>

        {/* DESKTOP BUTTONS */}
        <ButtonContainer>
          <GithubButton href={Bio.github} target="_blank">
            Github
          </GithubButton>
          <GithubButton
            href={process.env.PUBLIC_URL + "/Hashir Bussiness Resume.pdf"}
            target="_blank"
          >
            Resume
          </GithubButton>
        </ButtonContainer>

        {/* MOBILE MENU */}
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            {/* LINKS GRID */}
            <MobileLinkGrid>
              <LeftLink onClick={() => setIsOpen(false)} href="#About">
                About
              </LeftLink>

              <RightLink onClick={() => setIsOpen(false)} href="#Skills">
                Skills
              </RightLink>

              <LeftLink onClick={() => setIsOpen(false)} href="#Experience">
                Experience
              </LeftLink>

              <RightLink onClick={() => setIsOpen(false)} href="#Projects">
                Projects
              </RightLink>
            </MobileLinkGrid>

            {/* EDUCATION CENTER */}
            <CenterLink onClick={() => setIsOpen(false)} href="#Education">
              Education
            </CenterLink>

            {/* BUTTON GRID */}
            <MobileButtonRow>
              <GithubButton
                href={Bio.github}
                target="_blank"
                style={{
                  background: theme.primary,
                  color: theme.text_primary,
                }}
              >
                Github
              </GithubButton>

              <GithubButton
                href={process.env.PUBLIC_URL + "/Hashir Bussiness Resume.pdf"}
                target="_blank"
                style={{
                  background: theme.primary,
                  color: theme.text_primary,
                }}
              >
                Resume
              </GithubButton>
            </MobileButtonRow>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
