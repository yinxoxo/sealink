const initialSimpleCardContent = {
  texts: [
    {
      id: "text-1",
      text: "Hydra",
      style: {
        color: "#336a5a",
        fontWeight: 700,
        fontSize: "36px",
        fontFamily: "Georgia, serif",
      },
    },
    {
      id: "text-2",
      text: "Hydra Juice",
      style: {
        color: "#000000",
        fontWeight: 400,
        fontSize: "18px",
        fontFamily: "Arial, sans-serif",
      },
    },
    {
      id: "text-3",
      text: "Your daily dose of vitamin C",
      style: {
        color: "#808080",
        fontWeight: 400,
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      },
    },
  ],

  buttons: {
    buttonList: [
      { id: "button-1", text: "Our drinks", url: "https://example.com" },
      { id: "button-2", text: "Find us", url: "https://example.com" },
      { id: "button-3", text: "Wellbeing", url: "https://example.com" },
    ],
    style: {
      backgroundColor: "#F0F0F0",
      width: "90%",
      color: "#000000",
      borderRadius: "20px",
      padding: "14px",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "Arial, sans-serif",
    },
  },
  background: {
    backgroundImage: `url(https://images.unsplash.com/photo-1725785897139-1a7834b62e2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    opacity: 0.6,
    backgroundColor: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  socialLinks: {
    id: "icon-1",
    iconList: [
      {
        id: "Instagram",
        name: "Instagram",
        href: "https://instagram.com",
      },
      {
        id: "Threads",
        name: "Threads",
        href: "https://threads.net",
      },
      { id: "Github", name: "Github", href: "https://github.com" },
    ],
    style: {
      color: "#fff",
      size: 30,
    },
  },
  avatar: {
    id: "avatar-1",
    image:
      "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    style: {
      width: "100px",
      height: "100px",
    },
  },
};

initialSimpleCardContent.itemsOrder = [
  { id: `avatar-1`, type: "avatar" },
  { id: "text-1", type: "text" },
  { id: "text-2", type: "text" },
  { id: "text-3", type: "text" },
  { id: `icons-1`, type: "icons" },
  { id: "button-1", type: "button" },
  { id: "button-2", type: "button" },
  { id: "button-3", type: "button" },
];

export default initialSimpleCardContent;
