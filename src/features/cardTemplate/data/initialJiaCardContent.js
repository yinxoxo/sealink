const initialJiaCardContent = {
  texts: [
    {
      id: "text-1",
      text: "Jia Zhou",
      style: {
        color: "#FFFFFF",
        fontWeight: 600,
        fontSize: "24px",
        fontFamily: "Share Tech Mono, sans-serif",
      },
    },
    {
      id: "text-2",
      text: "Giving clothing a second chance",
      style: {
        color: "#FFFFFF",
        fontWeight: 700,
        fontSize: "16px",
        fontFamily: "Share Tech Mono, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      { id: "button-1", text: "Vintage Store", url: "https://example.com" },
      {
        id: "button-2",
        text: "Favourite thrift stores",
        url: "https://example.com",
      },
      { id: "button-3", text: "Inspiration", url: "https://example.com" },
    ],
    style: {
      backgroundColor: "#E4CDA5",
      width: "90%",
      color: "#5F3E22",
      borderRadius: "0px",
      padding: "14px",
      fontSize: "16px",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
  },

  background: {
    backgroundImage: `url(https://images.unsplash.com/photo-1561910775-e0ebd87f33a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGRhcmslMjBicmlja3xlbnwwfHwwfHx8MA%3D%3D)`,
    opacity: 0.8,
    backgroundColor: "#8B5D3B",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  socialLinks: {
    id: "icon-1",
    iconList: [
      {
        id: "Facebook",
        name: "Facebook",
        href: "https://facebook.com",
        icon: "FaFacebook",
      },
      {
        id: "Instagram",
        name: "Instagram",
        href: "https://instagram.com",
        icon: "FaInstagram",
      },
      {
        id: "Snapchat",
        name: "Snapchat",
        icon: "FaSnapchat",
        href: "https://snapchat.com",
      },
    ],
    style: {
      color: "#E4CDA5",
      size: 30,
    },
  },

  avatar: {
    id: "avatar-1",
    image:
      "https://cdn.pixabay.com/photo/2020/05/03/18/57/stand-5126363_1280.jpg",
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

initialJiaCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  { id: "text-1", type: "text" },
  { id: "text-2", type: "text" },
  { id: `icons-1`, type: "icons" },
  { id: "button-1", type: "button" },
  { id: "button-2", type: "button" },
  { id: "button-3", type: "button" },
];

export default initialJiaCardContent;
