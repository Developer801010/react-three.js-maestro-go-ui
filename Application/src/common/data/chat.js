const chats = [
  {
    id: 1,
    roomId: 1,
    status: "offline",
    image: "avatar2",
    name: "Server 2019",
    description: "IP: 17.16.4.20",
    time: "Port: 443",
  },
  {
    id: 2,
    roomId: 2,
    status: "online",
    image: "avatar3",
    name: "Lab Switch",
    description: "IP: 17.16.4.20",
    time: "Port: 8080",
  },
  {
    id: 3,
    roomId: 3,
    status: "online",
    image: "avatar3",
    name: "Server 2016",
    description: "IP: 17.16.4.20",
    time: "Port: 443",
  },
  {
    id: 4,
    roomId: 4,
    status: "intermediate",
    image: "avatar4",
    name: "Server 2019",
    description: "IP: 17.16.4.142",
    time: "Port: 5092",
  },
  {
    id: 5,
    roomId: 5,
    status: "offline",
    image: "avatar4",
    name: "IP Camera",
    description: "IP: 17.16.6.34",
    time: "Port: 3030",
  },
  {
    id: 6,
    roomId: 6,
    status: "online",
    image: "avatar6",
    name: "PBX Phone",
    description: "IP: 17.16.5.213",
    time: "Port: 8006",
  },
  {
    id: 7,
    roomId: 7,
    status: "online",
    image: "avatar6",
    name: "Server RHEL",
    description: "IP: 17.16.4.23",
    time: "Port: 5003",
  },
]

const groups = [
  { id: 1, image: "G", name: "Corp Network" },
  { id: 2, image: "R", name: "Lab1 Network" },
  { id: 3, image: "M", name: "Research Network" },
  { id: 4, image: "A", name: "Site A Network" },
  { id: 5, image: "B", name: "Site B Network" },
]

const contacts = [
  {
    category: "Servers",
    child: [
      { id: 1, name: "Active Directory" },
      { id: 2, name: "DNS Service" },
      { id: 3, name: "Routing Server" },
      { id: 4, name: "Teams Server" },
    ],
  },
  {
    category: "Switches",
    child: [{ id: 1, name: "Main Switch" }],
  },
  {
    category: "Apps",
    child: [
      { id: 1, name: "GIS Search" },
      { id: 2, name: "ElastaSearch" },
      { id: 3, name: "Teams" },
    ],
  },
  {
    category: "Other",
    child: [
      { id: 4, name: "IP Cameras" },
      { id: 4, name: "SIP Phone" }
    ],
  },
]

const messages = [
  {
    id: 1,
    roomId: 1,
    sender: "Henry Wells",
    message: "Hello!",
    createdAt: "2020-04-02T17:00:21.529Z",
  },
  {
    id: 2,
    roomId: 1,
    sender: "Henry Wells",
    message: "How are you ?",
    createdAt: "2020-04-02T17:01:21.529Z",
  },
  {
    id: 3,
    roomId: 1,
    sender: "Steven Franklin",
    message: "I am fine, What about you ?",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
  {
    id: 4,
    roomId: 2,
    sender: "Adam Miller",
    message: "Hello!",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
  {
    id: 5,
    roomId: 3,
    sender: "Keith Gonzales",
    message: "Hello!",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
  {
    id: 6,
    roomId: 4,
    sender: "Jose Vickery",
    message: "Hello!",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
  {
    id: 7,
    roomId: 5,
    sender: "Mitchel Givens",
    message: "Hello!",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
  {
    id: 8,
    roomId: 6,
    sender: "Stephen Hadley",
    message: "Hello!",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
  {
    id: 9,
    roomId: 7,
    sender: "Keith Gonzales",
    message: "Hello!",
    createdAt: "2020-04-02T17:07:21.529Z",
  },
]

export { chats, messages, contacts, groups }
