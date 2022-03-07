import { Graph} from "react-d3-graph";
import React, { useState, useMemo, useRef, useEffect } from "react";
import * as d3 from 'd3';
import ReactLoading from "react-loading";
import axios from "axios";
import NodeTreeView from "./NodeTreeView";
import "./Graph.css";
import "./Graph2Clusters.css"

function Graph2Clusters() {
  // the graph configuration, just override the ones you need
  var initialConfig = {
    // "automaticRearrangeAfterDropNode": true,
    collapsible: false,
    directed: true,
    focusAnimationDuration: 0.3,
    focusZoom: 2,
    freezeAllDragEvents: false,
    height: window.innerHeight * 0.947,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    initialZoom: 0.4,
    maxZoom: 12,
    minZoom: 0.05,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: true,
    // "staticGraphWithDragAndDrop": true,
    width: window.innerWidth,
    d3: {
      alphaTarget: 0.05,
      gravity: -500,
      linkLength: 400,
      linkStrength: 2,
      disableLinkForce: false,
    },
    node: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 20,
      fontWeight: "normal",
      highlightColor: "blue",
      highlightFontSize: 25,
      highlightFontWeight: "bold",
      // highlightStrokeColor: "red",
      highlightStrokeWidth: 1.5,
      labelPosition: "top",
      mouseCursor: "grab",
      opacity: 0.9,
      renderLabel: true,
      size: 500,
      strokeColor: "none",
      strokeWidth: 1.5,
      // svg: "https://www.svgrepo.com/show/1296/student-computer.svg",
      symbolType: "circle",
    },
    link: {
      color: "lightblue",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "blue",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      mouseCursor: "grab",
      opacity: 1,
      renderLabel: true,
      semanticStrokeWidth: true,
      strokeWidth: 3,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt",
      type: "STRAIGHT",
    },
  };

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [myConfig, setConfig] = useState();

  useEffect(() => {
    localStorage.removeItem("translate")
    axios
      .get("https://monolithaipcg-backend.herokuapp.com/api/getdata", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setConfig(initialConfig)
      });
  }, []);
  const Example = ({ type, color }) => (
    <ReactLoading type={"bars"} color={"#ffffff"} height={667} width={375} />
  );
  if (isLoading) {
    return <Example />;
  }

  const onHoverCluster = function (components) {

    for(var i in data[0].nodes){
        d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> text').transition().duration(10).attr('opacity', '0.2')
        d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> image').transition().duration(10).attr('opacity', '0.2')
    }

    for(var i in components){
      d3.select("#" + CSS.escape(components[i].Parent.toString())).selectAll("#" + CSS.escape(components[i].Parent.toString()) + '> text').transition().duration(10).attr('font-size', 25).attr('dy', parseFloat(-31.5)).attr('font-weight', "bold").attr('opacity', '1')
      d3.select("#" + CSS.escape(components[i].Parent.toString())).selectAll("#" + CSS.escape(components[i].Parent.toString()) + '> image').transition().duration(10).attr('opacity', '1')
    }
    for(var j in components){
      for(var i in components[j].Child){
        d3.select("#" + CSS.escape(components[j].Child[i].toString())).selectAll("#" + CSS.escape(components[j].Child[i].toString()) + '> text').transition().duration(10).attr('font-size', 25).attr('dy', parseFloat(-31.5)).attr('font-weight', "bold").attr('opacity', '1')
        d3.select("#" + CSS.escape(components[j].Child[i].toString())).selectAll("#" + CSS.escape(components[j].Child[i].toString()) + '> image').transition().duration(10).attr('opacity', '1')
      }
    }

  }

  const outHoverCluster = function (nodeId){
    for(var i in data[0].nodes){
      d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> text').transition().duration(10).attr('font-size', 20).attr('dy', parseFloat(-26.5)).attr('font-weight', "normal").attr('opacity', '1')
      d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> image').transition().duration(10).attr('opacity', '1')
    }
  }

  const onHover = function (nodeId) {
    var id = ''
    for(var i in data[0].nodes){
      if(data[0].nodes[i].id.toString() !== nodeId.toString()){
        d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> text').transition().duration(10).attr('opacity', '0.2')
        d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> image').transition().duration(10).attr('opacity', '0.2')
      }
    }

    for(var i in data[0].links){
      id = data[0].links[i].source + ',' + data[0].links[i].target
      if(data[0].links[i].source == nodeId){
        d3.select("#" + CSS.escape(id)).transition().duration(10).attr("marker-end", "url(#marker-small-highlighted)")
        var target = data[0].links[i].target.toString()
        d3.select("#" + CSS.escape(target)).selectAll("#" + CSS.escape(target) + '> image').transition().duration(10).attr('opacity', '1')
        d3.select("#" + CSS.escape(target)).selectAll("#" + CSS.escape(target) + '> text').transition().duration(10).attr('font-size', 25).attr('dy', parseFloat(-31.5)).attr('font-weight', "bold").attr('opacity', '1')
      }else{
        var style = d3.select("#" + CSS.escape(id)).attr("style")
        var new_style = style.toString().replace("opacity: 1;", "opacity: 0.5;")
        style.toString().concat(" stroke: black; opacity: 0.2;")
        d3.select("#" + CSS.escape(id)).transition().duration(10).attr("style", new_style)
      }
    }

    var node = d3.select("#" + CSS.escape(nodeId))
    node.selectAll("#" + CSS.escape(nodeId) + '> text').transition().duration(10).attr('font-size', 25).attr('dy', parseFloat(-31.5)).attr('font-weight', "bold").attr('opacity', '1')

  }

  const outHover = function (nodeId) {

    var id = ''
    for(var i in data[0].links){
      id = data[0].links[i].source + ',' + data[0].links[i].target
      if(data[0].links[i].source == nodeId){
        d3.select("#" + CSS.escape(id)).transition().duration(10).attr("marker-end", "url(#marker-small)")
        var target = data[0].links[i].target.toString()
        d3.select("#" + CSS.escape(target)).selectAll("#" + CSS.escape(target) + '> text').transition().duration(10).attr('font-size', 20).attr('dy', parseFloat(-26.5)).attr('font-weight', "normal")

      }else{
        var style = d3.select("#" + CSS.escape(id)).attr("style")
        var new_style = style.toString().replace("opacity: 0.5;", "opacity: 1;")
        // style.toString().concat(" stroke: black; opacity: 1;")
        d3.select("#" + CSS.escape(id)).transition().duration(10).attr("style", new_style)
      }
    }
    for(var i in data[0].nodes){
      d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> text').transition().duration(10).attr('font-size', 20).attr('dy', parseFloat(-26.5)).attr('font-weight', "normal").attr('opacity', '1')
      d3.select("#" + CSS.escape(data[0].nodes[i].id.toString())).selectAll("#" + CSS.escape(data[0].nodes[i].id.toString()) + '> image').transition().duration(10).attr('opacity', '1')
    }

  }


  const onClickNode = function (nodeId) {
    myConfig.initialZoom = 3
    axios
    .get("https://monolithaipcg-backend.herokuapp.com/api/getdata", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      res.data[0]["focusedNodeId"] = nodeId
      setData(res.data);
    });
  };

  return (
    <div className= "rowC">
    <NodeTreeView
      onClickNode={onClickNode}
      onHover={onHover}
      outHover={outHover}
      onHoverCluster={onHoverCluster}
      outHoverCluster={outHoverCluster}
    />
    <Graph
      id="graph-id2"
      data={data[0]}
      config={myConfig}
      onClickNode={onClickNode}
    />
    </div>
  );
}

export default Graph2Clusters;
