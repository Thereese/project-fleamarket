// import react from "react";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

export const Footer = () => {
  return (
    <footer>
      <div className="footer-txt">
        <p>
          Created by Therese Nyman&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <a
            href="https://linkedin.com/in/therese-nyman"
            target="_blank"
            rel="noopener"
            aria-label="Link to LinkedIn"
          >
            <IoLogoLinkedin />
          </a>
          <a
            href="https://github.com/Thereese"
            target="_blank"
            rel="noopener"
            aria-label="Link to Github"
          >
            <IoLogoGithub />
          </a>
        </p>
      </div>
    </footer>
  );
};
