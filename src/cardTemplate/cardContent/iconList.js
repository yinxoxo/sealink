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
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com",
  },
  {
    id: "threads",
    name: "Threads",
    icon: FaThreads,
    href: "https://threads.net",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: FaFacebook,
    href: "https://facebook.com",
  },
  {
    id: "email",
    name: "Email",
    icon: FaEnvelope,
    href: "mailto:someone@example.com",
  },
  {
    id: "youtube",
    name: "Youtube",
    icon: FaYoutube,
    href: "https://youtube.com",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: FaSnapchat,
    href: "https://snapchat.com",
  },
  { id: "portrait", name: "Portrait", icon: FaImagePortrait, href: "#" },
  { id: "dev", name: "Dev", icon: FaDev, href: "https://dev.to" },
  {
    id: "linkedin",
    name: "Linkedin",
    icon: FaLinkedin,
    href: "https://linkedin.com",
  },
];

const ICON_STYLE = {
  SimpleCard: {
    color: "#ffffff",
    size: 30,
  },
};

export { ICON_LIST, ICON_STYLE };
