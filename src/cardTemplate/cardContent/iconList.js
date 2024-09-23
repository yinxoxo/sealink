import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaThreads,
  FaGithub,
  FaYoutube,
  FaSnapchat,
  FaImagePortrait,
  FaDev,
  FaLinkedin,
} from "react-icons/fa6";

const ICON_LIST = [
  { id: "x", name: "X", icon: FaTwitter, href: "https://twitter.com" },
  {
    id: "Instagram",
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com",
  },
  {
    id: "Threads",
    name: "Threads",
    icon: FaThreads,
    href: "https://threads.net",
  },
  {
    id: "Facebook",
    name: "Facebook",
    icon: FaFacebook,
    href: "https://facebook.com",
  },
  {
    id: "Github",
    name: "Github",
    icon: FaGithub,
    href: "https://github.com",
  },
  {
    id: "Email",
    name: "Email",
    icon: FaEnvelope,
    href: "mailto:someone@example.com",
  },
  {
    id: "Youtube",
    name: "Youtube",
    icon: FaYoutube,
    href: "https://youtube.com",
  },
  {
    id: "Snapchat",
    name: "Snapchat",
    icon: FaSnapchat,
    href: "https://snapchat.com",
  },
  { id: "Portrait", name: "Portrait", icon: FaImagePortrait, href: "#" },
  { id: "Dev", name: "Dev", icon: FaDev, href: "https://dev.to" },
  {
    id: "Linkedin",
    name: "Linkedin",
    icon: FaLinkedin,
    href: "https://linkedin.com",
  },
];

const ICON_MAP = {
  X: FaTwitter,
  Instagram: FaInstagram,
  Threads: FaThreads,
  Facebook: FaFacebook,
  Github: FaGithub,
  Email: FaEnvelope,
  Youtube: FaYoutube,
  Snapchat: FaSnapchat,
  Portrait: FaImagePortrait,
  Dev: FaDev,
  Linkedin: FaLinkedin,
};

const ICON_STYLE = {
  SimpleCard: {
    color: "#ffffff",
    size: 30,
  },
};

export { ICON_LIST, ICON_STYLE, ICON_MAP };
