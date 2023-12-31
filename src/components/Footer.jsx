// Footer.js
import React from 'react';
import styled from '@emotion/styled';

import { FaGooglePlay, FaGithub, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #252525;
  color: white;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-height: 50px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 5px;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 24px;

  &:hover {
    color: #61dafb;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <IconContainer>
        <SocialLink href="https://play.google.com/store/apps/dev?id=6632579568267785315&hl=es&gl=US" target="_blank">
          <FaGooglePlay />
        </SocialLink>
        <SocialLink href="https://github.com/Apoolgff" target="_blank">
          <FaGithub />
        </SocialLink>
        <SocialLink href="https://www.instagram.com/apoolgff" target="_blank">
          <FaInstagram />
        </SocialLink>
      </IconContainer>
      <p>Paolo Ferro</p>
    </FooterContainer>
  );
};

export default Footer;