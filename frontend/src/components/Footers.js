import react from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";

export const Footer = () => {
  return (
    <footer>
      <div className="footer-txt">
        <p>
          Created by Therese Nyman&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <FiMail />
          &nbsp;&nbsp;&nbsp;
          <a
            href="https://github.com/Thereese"
            target="_blank"
            rel="noopener"
            aria-label="Github"
          >
            <IoLogoGithub />
          </a>
        </p>
      </div>
    </footer>
  );
};
