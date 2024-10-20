import {
  FaDev,
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaImagePortrait,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSnapchat,
  FaSpotify,
  FaThreads,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const ICON_LIST = [
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
    href: "mailto:youremail@mail.com",
  },
  {
    id: "Youtube",
    name: "Youtube",
    icon: FaYoutube,
    href: "https://youtube.com",
  },
  { id: "X", name: "X", icon: FaTwitter, href: "https://twitter.com" },
  {
    id: "Snapchat",
    name: "Snapchat",
    icon: FaSnapchat,
    href: "https://snapchat.com",
  },
  {
    id: "Discord",
    name: "Discord",
    icon: FaDiscord,
    href: "https://discord.com/",
  },
  {
    id: "Spotify",
    name: "Spotify",
    icon: FaSpotify,
    href: "https://open.spotify.com/",
  },
  { id: "Portrait", name: "Portrait", icon: FaImagePortrait, href: "#" },
  { id: "Dev", name: "Dev", icon: FaDev, href: "https://dev.to" },
  {
    id: "Linkedin",
    name: "Linkedin",
    icon: FaLinkedin,
    href: "https://linkedin.com",
  },
  {
    id: "Pinterest",
    name: "Pinterest",
    icon: FaPinterest,
    href: "https://www.pinterest.com/",
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
  Spotify: FaSpotify,
  Discord: FaDiscord,
  Pinterest: FaPinterest,
};

const ICON_STYLE = {
  SimpleCard: {
    color: "#ffffff",
    size: 30,
  },
};

export { ICON_LIST, ICON_MAP, ICON_STYLE };
