import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import * as d3 from "d3";
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

import "react-perfect-scrollbar/dist/css/styles.css";

//redux
import ForceGraph3D from 'react-force-graph-3d';
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';

import process from '../../common/data/mm_process.json';
import service from '../../common/data/mm_service.json';
import application from '../../common/data/monoMicAppList.json';

import wand from "../../assets/images/wand.svg";

const monoMicApplication = () => {
    const fgRef = useRef();
    const [highlightNode, setHighlightNode] = useState(null);
    const [highlightLinks, setHighlightLinks] = useState([]);
    const [hoverNode, setHoverNode] = useState(null);
    const [data, setData] = useState({ links: [], nodes: [] });
    const [isOpenModal, setModalState] = useState(false);
    const modalStyles = {
        overlay: {
            backgroundColor: '#ffffff',
        },
    };
    const icons = ["fas fa-browser fa-fw", "fas fa-gear fa-fw", "fas fa-microchip fa-fw", "fas fa-microchip fa-fw", "fas fa-microchip fa-fw"];
    const types = ["Application", "Service", "Process", "Host", "Database"];

    const NODE_R = 12;

    useEffect(() => {
        // axios
        //     .get("https://maestro2go.azurewebsites.net/api/mono_2_micro", {
        //         headers: { "Access-Control-Allow-Origin": "*", },
        //     })
        //     .then((res) => {
        //         setData(res.data);
        //     });
        let links = [], nodes = [];

        application[0].appList.forEach(app => {
            service.forEach(ser => {
                if (ser.appID === app.id) {
                    links.push({ "source": "app-" + app.id, "target": "service-" + ser.id, value: 0, type: "solid", color: "#fff" });
                }
            })
        });

        application[0].appList.forEach(app => {
            process.forEach(pro => {
                if (pro.appID === app.id) {
                    links.push({ "source": "process-" + pro.id, "target": "app-" + app.id, value: 0, type: "dotted", color: "#0f0" });
                }
            })
        });

        application[0].appList.forEach(app => {
            let nodeLinks = links.filter(link => link.target === "app-" + app.id || link.source === "app-" + app.id);
            nodes.push({ group: 1, id: "app-" + app.id, links: nodeLinks, icon: "fas fa-browser fa-fw" });
            console.log("nodelinks are", nodeLinks);
        });

        service.forEach(ser => {
            nodes.push({ group: 2, app: ser.appID, id: "service-" + ser.id, links: [] });
        });

        process.forEach(pro => {
            nodes.push({ group: 3, app: pro.appID, id: "process-" + pro.id, links: [] });
        });

        console.log("links are", links, nodes);

        setData({ links: links, nodes: nodes });
    }, []);

    const toggleModal = () => {
        setModalState(!isOpenModal);
    };

    const updateHighlight = () => {
        setHighlightNode(highlightNode);
        setHighlightLinks(highlightLinks);
    };

    // const handleNodeClick = useCallback(
    //     (node) => {
    //         d3.selectAll("#node-info-container").remove();
    //         // Aim at node from outside it
    //         const distance = 400;
    //         const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    //         fgRef.current.cameraPosition(
    //             { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
    //             node, // lookAt ({ x, y, z })
    //             3000  // ms transition duration
    //         );

    //         console.log("node is", node);
    //     },
    //     [fgRef]
    // );

    const handleNodeClick = node => {
        d3.selectAll("#node-info-container").remove();
        // Aim at node from outside it
        const distance = 400;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );

        setHighlightLinks([node.links]);
        setHighlightNode(node);
        console.log("hgith is", highlightLinks, highlightNode);
        // highlightNode.clear();
        // highlightLinks.clear();
        // if (node) {
        //     highlightNode.add(node);
        //     // node.neighbors.forEach(neighbor => highlightNode.add(neighbor));
        //     // node.links.forEach(link => highlightLinks.add(link));
        // }

        // setHoverNode(node || null);
        // updateHighlight();
    };

    const onNodeClick = function (node, event) {
        console.log(data[0])
        for (var entry in data[0]["nodes"]) {
            if (data[0]["nodes"][entry].id == node.id) {
                window.alert("IP: " + String(node.id).split(":")[0] + " with port " + String(node.id).split(":")[1] + " is part of cluster number " + data[0]["nodes"][entry].group)
            }
        }

    }

    const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
        ctx.fill();
    }, [hoverNode]);

    return (
        <React.Fragment>
            <div className="bread-bar">
                <span>Monolithic apps</span>
            </div>

            <div className="main-content mono-mic mono-app">
                <div className="intelBar">
                    <Link className="link active" to="/MonoMic/application">
                        <i className="fa-duotone fa-map-location-dot"></i>

                        <span>
                            <i className="fas fa-browser fa-fw"></i>

                            Application
                        </span>
                    </Link>

                    <Link className="link" to="/MonoMic/services">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>

                        <span>
                            <i className="fas fa-gear fa-fw"></i>

                            Services
                        </span>

                        <div className="service-container">
                            <div className="service-box">
                                <div className="service-icon">
                                    <i className="fas fa-gear fa-fw"></i>
                                </div>

                                <div className="service-text">
                                    <span>
                                        32
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link className="link" to="/MonoMic/processes">
                        <span>
                            <i className="fas fa-microchip fa-fw"></i>

                            Processes
                        </span>

                        <div className="service-container">
                            <div className="service-box">
                                <div className="service-icon">
                                    <i className="fas fa-microchip fa-fw"></i>
                                </div>

                                <div className="service-text">
                                    <span>
                                        32
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link className="link" to="/MonoMic/host">
                        <span>
                            <i className="fas fa-server fa-fw"></i>

                            Host
                        </span>

                        <div className="service-container">
                            <div className="service-box">
                                <div className="service-icon">
                                    <i className="fas fa-server fa-fw"></i>
                                </div>

                                <div className="service-text">
                                    <span>
                                        32
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link className="link" to="/MonoMic/database">
                        <span>
                            <i className="fas fa-database fa-fw"></i>

                            Database
                        </span>

                        <div className="service-container">
                            <div className="service-box">
                                <div className="service-icon">
                                    <i className="fas fa-database fa-fw"></i>
                                </div>

                                <div className="service-text">
                                    <span>
                                        32
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <button className={`small-wand ${highlightNode !== null ? 'active' : ''}`} onClick={toggleModal}>
                        <img src={wand} alt="wand-logo" />
                    </button>
                </div>

                <ForceGraph3D
                    nodeRelSize={NODE_R}
                    ref={fgRef}
                    graphData={data}
                    extraRenderers={[new CSS3DRenderer()]}
                    autoPauseRedraw={false}
                    nodeLabel="id"
                    nodeAutoColorBy="group"
                    nodeThreeObject={node => {
                        const nodeEl = document.createElement('i');
                        nodeEl.className = icons[node.group - 1];
                        nodeEl.style.color = "#ccc";
                        nodeEl.style.fontSize = "13px";
                        return new CSS3DObject(nodeEl);
                    }}

                    nodeThreeObjectExtend={true}

                    nodeOpacity={1}
                    linkOpacity={.8}
                    linkDirectionalParticles={4}
                    linkDirectionalParticleWidth={node => highlightNode === node ? 4 : 2}
                    linkWidth={link => highlightLinks.includes(link) ? 2 : 1}
                    linkColor={link => highlightLinks.indexOf(item => item.id === link.id) > -1 ? "#456cc8" : link.color}
                    nodeCanvasObject={paintRing}
                    onNodeClick={handleNodeClick}
                    nodeCanvasObjectMode={node => highlightNode === node ? 'before' : undefined}
                    nodeColor={node => highlightNode === node ? "#b1ffa3" : "#2f5f54"}
                />
            </div>


            <CSSTransition
                in={isOpenModal}
                timeout={300}
                classNames="dialog"
            >
                <Modal
                    closeTimeoutMS={500}
                    isOpen={isOpenModal}
                    style={modalStyles}
                    onRequestClose={toggleModal}
                    onClick={toggleModal}
                    ariaHideApp={false}
                >
                    {
                        highlightNode !== null ?
                            <>
                                <div className="text-wapper">
                                    <h2>Type: <span>{types[highlightNode.group - 1]}</span></h2>
                                </div>

                                <div className="text-wapper">
                                    <h2>App Name: <span>SAP SLD</span></h2>
                                </div>

                                <div className="text-wapper">
                                    <h2>Service Name: <span>portal</span></h2>
                                </div>

                                <div className="text-wapper">
                                    <h2>Process Name: <span>D4a v4</span></h2>
                                </div>

                                <div className="text-wapper">
                                    <h2>Host Name: <span>Host 1</span></h2>
                                </div>

                                <div className="text-wapper">
                                    <h2>Database Name: <span>Database 1</span></h2>
                                </div>
                            </> : ""
                    }
                    {/* <button onClick={toggleModal}>
                        Close Modal
                    </button>
                    <div>Hello World</div> */}
                </Modal>
            </CSSTransition>
        </ React.Fragment >
    );
}
export default monoMicApplication;