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
import applications from '../../common/data/monoMicAppList.json';

const monoMic = props => {
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


  const onNodeClick = function (node, event) {
    console.log(data[0])
    for (var entry in data[0]["nodes"]) {
      if (data[0]["nodes"][entry].id == node.id) {
        window.alert("IP: " + String(node.id).split(":")[0] + " with port " + String(node.id).split(":")[1] + " is part of cluster number " + data[0]["nodes"][entry].group)
      }
    }

  }


  const [data, setData] = useState([])

  return (
    <React.Fragment>
      <div className="bread-bar">
        <span>Monolithic apps</span>
      </div>

      <div className="main-content mono-mic">
        <div className="intelBar">
          <Link className="link" to="/MonoMic/application">
            <span>
              <i className="fas fa-browser fa-fw"></i>

              Application
            </span>
          </Link>

          <Link className="link" to="/MonoMic/services">
            <span>
              <i className="fas fa-gear fa-fw"></i>

              Services
            </span>
          </Link>

          <Link className="link" to="/MonoMic/processes">
            <span>
              <i className="fas fa-microchip fa-fw"></i>

              Processes
            </span>
          </Link>

          <Link className="link" to="/MonoMic/host">
            <span>
              <i className="fas fa-server fa-fw"></i>

              Host
            </span>
          </Link>

          <Link className="link" to="/MonoMic/database">
            <span>
              <i className="fas fa-database fa-fw"></i>

              Database
            </span>
          </Link>
        </div>

        <div className="data-source">
          <div className="source-title">
            <div className="title-left">
              <h3>Monolithic Application</h3>
              <h4>Listing of monolithic applications within your current environment.</h4>
            </div>

            <div className="title-right">
              <h2 className="text-uppercase">Data sources</h2>
            </div>
          </div>

          <div className="table-wrapper scrollable">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ComplexScore(%)</th>
                  <th>Appname</th>
                  <th>Host</th>
                  <th>Size</th>
                  <th>Services</th>
                  <th>Process</th>
                  <th>DataSets</th>
                  <th>Dependent</th>
                </tr>
              </thead>

              <tbody>
                {
                  applications.map((item, index) =>
                    <tr key={`td-${index}`}>
                      <td> {item.id}</td>
                      <td>{item.complexScore}%</td>
                      <td>{item.appName}</td>
                      <td>{item.host}</td>
                      <td>{item.size}</td>
                      <td>{item.services}</td>
                      <td>{item.process}</td>
                      <td>{item.dataSets}</td>
                      <td>{item.dependent}</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ React.Fragment >
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
export default monoMic;