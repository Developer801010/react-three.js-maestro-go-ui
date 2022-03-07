  import React, { useEffect, useState } from "react";
  import MetaTags from "react-meta-tags";
  import PropTypes from "prop-types";
  import { Link } from "react-router-dom";
  import { isEmpty, map } from "lodash";
  import moment from "moment";
  import axios from "axios"
  import {
    Button,
    ButtonToolbar,
    ButtonGroup,
    Input,
    InputGroup,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Tooltip,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  
  } from "reactstrap";
  import classnames from "classnames";


  // ---------
  // .start API Calls
  //import api from '../../intelooServices/api/techknow'
  //import auto from '../../intelooServices/api/api_tech'

  //Import Scrollbar
  import PerfectScrollbar from "react-perfect-scrollbar";
  import "react-perfect-scrollbar/dist/css/styles.css";

  //icon
  import * as faIcon from 'react-icons/fa'
  import * as HiIcon from 'react-icons/hi'
  import * as GiIcon from 'react-icons/gi'
  import * as RiIcon from 'react-icons/ri'
  import * as GrIcon from 'react-icons/gr'
  import * as AiIcon from 'react-icons/ai'

  //Import Breadcrumb
  import Breadcrumbs from "components/Common/Breadcrumb";
  import images from "assets/images";
  import {
    addMessage as onAddMessage,
    getChats as onGetChats,
    getContacts as onGetContacts,
    getGroups as onGetGroups,
    getMessages as onGetMessages,
  } from "store/actions";

  //redux
  import { useSelector, useDispatch } from "react-redux";
  import ForceGraph3D from 'react-force-graph-3d';
  import myData from "../../datasets/demoData.json";
  import Intel from '../../components/3dgraph/inteligraph';

  const LiveGraph = props => {
    const dispatch = useDispatch();

    const { chats, groups, contacts, messages } = useSelector(state => ({
      chats: state.chat.chats,
      groups: state.chat.groups,
      contacts: state.chat.contacts,
      messages: state.chat.messages,
    }));

    const [messageBox, setMessageBox] = useState(null);
    // const Chat_Box_Username2 = "Maestro"
    const [currentRoomId, setCurrentRoomId] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [currentUser, setCurrentUser] = useState({
      name: "Maestro",
      isActive: true,
    });
    const [menu1, setMenu1] = useState(false);
    const [search_Menu, setsearch_Menu] = useState(false);
    const [settings_Menu, setsettings_Menu] = useState(false);
    const [other_Menu, setother_Menu] = useState(false);
    const [activeTab, setactiveTab] = useState("1");
    const [Chat_Box_Username, setChat_Box_Username] = useState("Maestro");
    // eslint-disable-next-line no-unused-vars
    const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online");
    const [curMessage, setcurMessage] = useState("");

    useEffect(() => {
      dispatch(onGetChats());
      dispatch(onGetGroups());
      dispatch(onGetContacts());
      dispatch(onGetMessages(currentRoomId));
    }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, currentRoomId]);

    useEffect(() => {
      if (!isEmpty(messages)) scrollToBottom();
    }, [messages]);

    // const toggleNotification = () => {
    //   setnotification_Menu(!notification_Menu)
    // }

    //Toggle Chat Box Menus
    const toggleSearch = () => {
      setsearch_Menu(!search_Menu);
    };

    const toggleSettings = () => {
      setsettings_Menu(!settings_Menu);
    };

    const toggleOther = () => {
      setother_Menu(!other_Menu);
    };

    const toggleTab = tab => {
      if (activeTab !== tab) {
        setactiveTab(tab);
      }
    };

    //Use For Chat Box
    const userChatOpen = (id, name, status, roomId) => {
      setChat_Box_Username(name);
      setCurrentRoomId(roomId);
      dispatch(onGetMessages(roomId));
    };

    const addMessage = (roomId, sender) => {
      const message = {
        id: Math.floor(Math.random() * 100),
        roomId,
        sender,
        message: curMessage,
        createdAt: new Date(),
      };
      setcurMessage("");
      dispatch(onAddMessage(message));
    };

    const scrollToBottom = () => {
      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight + 1000;
      }
    };

    const onKeyPress = e => {
      const { key, value } = e;
      if (key === "Enter") {
        setcurMessage(value);
        addMessage(currentRoomId, currentUser.name);
      }
    };


    //Modal Toggling
    const [modal_mi, setmodal_mi] = useState(false);
    const [modal_top, setmodal_top] = useState(false);

    function tog_Top() {
      setmodal_top(!modal_top);
      removeBodyCss();
    }

    function tog_Mi() {
      setmodal_mi(!modal_mi);
      removeBodyCss();
    }

    function removeBodyCss() {
      document.body.classList.add("no_padding");
    }

    //Toggle Switches

    const [toggleSwitch, settoggleSwitch] = useState(true);
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true);


    //serach recent user
    const searchUsers = () => {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("search-user");
      filter = input.value.toUpperCase();
      ul = document.getElementById("recent-list");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    };


    //3d Graph

    useEffect(() => {
      axios
        .get("https://maestro2go.azurewebsites.net/api/live_graph", {
          headers: { "Access-Control-Allow-Origin": "*", },
        })
        .then((res) => {
          console.log("sadsanjdhkuashndkuasnkidnsakildniklasnkudasd")

          console.log(res.data)
          setData(res.data);
          setData2(res.data);
          console.log("MIAU")
        });
    }, []);


  const [data, setData] = useState([])
  const [data2, setData2] = useState([])


  const onNodeClick = function(node, event) {

    var found = 0;
    for (var entry in data[0]["links"]){

      console.log(node.id)
      if(data[0]["links"][entry]['source'].id == node.id){
        window.alert("Node: " + node.id + " has outgoing trafic " + data[0]["links"][entry].value + " on the last 5 minutes.")
        found = 1
        break
      }else if (data[0]["links"][entry]['source'].target == node.id){
        window.alert("Node: " + node.id + " has incoming trafic " + data[0]["links"][entry].value + " on the last 5 minutes.")
        found = 1
        break
      }
    }

    if(found == 0){
      window.alert("No trafic found for node: " + node.id)
    }

  }


  return (
  <React.Fragment>
                  <div className="intelBar pt-3">
                  <span>TechKnow - LiveGraph</span>
                          <ButtonToolbar className="position-absolute m-1 top-0 end-0">
                              <ButtonGroup className="infoTools">
                                <Button
                                  className="gBack"
                                  size="sm"
                                  color="info"
                                  type="button"
                                  onClick={() => {
                                    tog_Top();
                                  }}
                                  data-toggle="modal"
                                  data-target="#topology"

                                >
                                  <HiIcon.HiOutlinePhotograph className="px-25w"/>
                                </Button>
                                <Button
                                  className="gBack"
                                  size="sm"
                                  color="info"
                                  type="button"
                                  onClick={() => {
                                    tog_Mi();
                                  }}
                                  data-toggle="modal"
                                  data-target="#model-info"
                                >
                                <HiIcon.HiOutlineInformationCircle className="px-25w"/>
                                </Button>
                              </ButtonGroup>
                            </ButtonToolbar>
                            <Modal
                              size="xl"
                              className="gBack"
                              isOpen={modal_top}
                              toggle={() => {
                                tog_Top();
                              }}
                            >
                            <div className="modal-header">
                              <h5
                                className="modal-title mt-0"
                                id="myTop"
                              >
                                Existing Topology Schematic
                              </h5>
                              <button
                                onClick={() => {
                                  setmodal_top(false);
                                }}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                                  <img className="topIMG" src={"/images/demoTop.png"}></img>
                            </div>
                          </Modal>
                            <Modal
                              size="xl"
                              isOpen={modal_mi}
                              toggle={() => {
                                tog_Mi();
                              }}
                            >
                            <div className="modal-header">
                              <h5
                                className="modal-title mt-0"
                                id="graphModelInfo"
                              >
                                AutoGraph - LiveGraph
                              </h5>
                              <button
                                onClick={() => {
                                  setmodal_mi(false);
                                }}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <p>Cras mattis consectetur purus sit amet fermentum.
                                Cras justo odio, dapibus ac facilisis in,
                                egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.</p>
                              <p>Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Vivamus sagittis lacus vel
                                augue laoreet rutrum faucibus dolor auctor.</p>
                              <p className="mb-0">Aenean lacinia bibendum nulla sed consectetur.
                                Praesent commodo cursus magna, vel scelerisque
                                nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor
                                fringilla.</p>
                            </div>
                          </Modal>



                      <div className="search-box chat-search-box py-3 mb-3">
                        <div className="position-relative">
                          <Input
                            onKeyUp={searchUsers}
                            id="search-user"
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>

                      <div className="chat-leftsidebar-nav">
                        <Nav pills justified>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "1",
                              })}
                              onClick={() => {
                                toggleTab("1");
                              }}
                            >
                              <i className="bx bx-chat font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">AutoGraph</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "2",
                              })}
                              onClick={() => {
                                toggleTab("2");
                              }}
                            >
                              <i className="bx bx-group font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Groups</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "3",
                              })}
                              onClick={() => {
                                toggleTab("3");
                              }}
                            >
                              <i className="bx bx-book-content font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Objects</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab} className="pt-3 pb-0">
                          <TabPane tabId="1">
                            <div>
                              <h5 className="font-size-14 mb-3">Graph EndPoints</h5>
                              <ul className="list-unstyled chat-list" id="recent-list">
                                <PerfectScrollbar style={{ height: "500px" }}>
                                  {map(chats, chat => (
                                    <li
                                      key={chat.id + chat.status}
                                      className={
                                        currentRoomId === chat.roomId
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          userChatOpen(
                                            chat.id,
                                            chat.name,
                                            chat.status,
                                            chat.roomId
                                          );
                                        }}
                                      >
                                        <div className="d-flex">
                                          <div className="align-self-center me-3">
                                            <i
                                              className={
                                                chat.status === "online"
                                                  ? "mdi mdi-circle text-success font-size-10"
                                                  : chat.status === "intermediate"
                                                    ? "mdi mdi-circle text-warning font-size-10"
                                                    : "mdi mdi-circle font-size-10"
                                              }
                                            />
                                          </div>
                                          <div className="align-self-center me-3">
                                          </div>
                                          <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-14 mb-1">
                                              {chat.name}
                                            </h5>
                                            <p className="text-truncate mb-0">
                                              {chat.description}
                                            </p>
                                          </div>
                                          <div className="font-size-11">
                                            {chat.time}
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </PerfectScrollbar>
                              </ul>
                            </div>
                          </TabPane>

                          <TabPane tabId="2">
                            <h5 className="font-size-14 mb-3">Groups</h5>
                            <ul className="list-unstyled chat-list">
                              <PerfectScrollbar style={{ height: "500px" }}>
                                {groups &&
                                  groups.map(group => (
                                    <li key={"test" + group.image}>
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          userChatOpen(
                                            group.id,
                                            group.name,
                                            group.status,
                                            Math.floor(Math.random() * 100)
                                          );
                                        }}
                                      >
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-xs me-3">
                                            <span className="text-primary">
                                              icon
                                            </span>
                                          </div>
                                          <div className="flex-grow-1">
                                            <h5 className="font-size-14 mb-0">
                                              {group.name}
                                            </h5>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                              </PerfectScrollbar>
                            </ul>
                          </TabPane>

                          <TabPane tabId="3">
                            <h5 className="font-size-14 mb-3">Objects</h5>

                            <div>
                              <PerfectScrollbar style={{ height: "500px" }}>
                                {contacts &&
                                  contacts.map(contact => (
                                    <div
                                      key={"test_" + contact.category}
                                      className={
                                        contact.category === "A" ? "" : "mt-4"
                                      }
                                    >
                                      <div className="avatar-xs mb-0">
                                        <span className="text-primary">
                                          {contact.category}
                                        </span>
                                      </div>

                                      <ul className="list-unstyled chat-list">
                                        {contact.child.map(array => (
                                          <li key={"test" + array.id}>
                                            <Link
                                              to="#"
                                              onClick={() => {
                                                userChatOpen(
                                                  array.id,
                                                  array.name,
                                                  array.status,
                                                  Math.floor(Math.random() * 100)
                                                );
                                              }}
                                            >
                                              <h5 className="font-size-14 mb-0">
                                                {array.name}
                                              </h5>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                              </PerfectScrollbar>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                  </div>
  
                  <div className="graphHud">
                    <img src="/images/load-gauage.png"></img>
                  </div>

      <ForceGraph3D
              graphData={data[0]}
              nodeLabel="id"
              nodeAutoColorBy="connections"
              nodeDesc= "id"
              //onNodeHover={node, prevNode} //Hover func
              //onLinkHover(link, prevLink)
              linkLabel="links.color"
              linkDesc="id"              //linkDesc
              linkDirectionalParticleColor="#7fd8ee"
              linkOpacity={.9}
              linkWidth={.2}
              //linkDirectionalParticles="value"
              linkDirectionalParticles={3}
              //linkDirectionalParticleSpeed={.002}
              linkDirectionalParticleSpeed={d => d.value * 0.001 || d.value + .001}
              linkDirectionalParticleWidth={.9}
      />
  </ React.Fragment>
  );
  autograph.propTypes = {
    graphData: PropTypes.object,
    Img: PropTypes.object,
    chats: PropTypes.array,
    groups: PropTypes.array,
    contacts: PropTypes.array,
    messages: PropTypes.array,
    onGetChats: PropTypes.func,
    onGetGroups: PropTypes.func,
    onGetContacts: PropTypes.func,
    onGetMessages: PropTypes.func,
    onAddMessage: PropTypes.func,
  };
  }
  export default LiveGraph;