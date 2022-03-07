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
  ModalFooter,

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

const AppCon = props => {
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
      .get("https://maestro2go.azurewebsites.net/api/mono_2_micro", {
        headers: { "Access-Control-Allow-Origin": "*", },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);


const [data, setData] = useState([])

return (
<React.Fragment>
                <div className="intelBar pt-3">
                <span>CloudRedi - App Containerization</span>
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
                                CloudRedi - App Containerization
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
                          </Modal>                </div>

    <ForceGraph3D
            graphData={data[0]}
            nodeLabel="id"
            nodeAutoColorBy="connections"
            nodeOpacity="1"
            linkOpacity=".8"
            getGraphBbox= {node => true}
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
export default AppCon;