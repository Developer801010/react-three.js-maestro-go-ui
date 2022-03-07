import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import React, { useState, useEffect } from 'react';
import './NodeTreeView.css';
import { RiNodeTree, RiComputerLine, RiPrinterLine, RiCloudLine, RiHome5Fill  } from "react-icons/ri";

import axios from "axios";

function SVG(string){
  if(string == "RiComputerLine"){
    return (<RiComputerLine/>);
  }
  if(string == "RiPrinterLine"){
    return (<RiPrinterLine/>);
  }
  if(string == "RiComputerLine"){
    return (<RiNodeTree/>);
  }
}

const NodeTreeView = ({onClickNode, onHover, outHover, onHoverCluster, outHoverCluster}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(true);

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://monolithaipcg-backend.herokuapp.com/api/getnavbar", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {

        setData(res.data);
        setLoading(true);
      });
  }, []);

  const handleToggleSidebar = () => {

    if(toggled==false){
      setCollapsed(true);
      setToggled(true);
    }else{
      setCollapsed(false);
      setToggled(false);
    }

  };

  if(isLoading){
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      style={{
        bottom:0,
        position:'absolute',
      }}
    >

      <SidebarHeader>
        <div
        style={{
          padding: '24px',
          fontWeight: 'bold',
          fontSize: 14,
          letterSpacing: '1px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        ><a onClick={()=>handleToggleSidebar()}><RiNodeTree/> Node Tree</a></div>

      </SidebarHeader>
      <Menu >
        {

          data.clusters.map((cluster) =>
          <SubMenu icon={<RiCloudLine/>} title={cluster.Name} key={cluster.Name} onMouseOver = {(e) => {onHoverCluster(cluster.Components);e.stopPropagation()}} onMouseOut = {(e) => {outHoverCluster(cluster.Components);e.stopPropagation()}}>
            {
              cluster.Components.map((component) =>

               <SubMenu icon={SVG(component.parentIcon)} title={component.Parent} key={component.Parent} onMouseOver = {(e) => {onHover(component.Parent);e.stopPropagation()}} onMouseOut = {(e) => {outHover(component.Parent);e.stopPropagation()}} onClick={()=>{console.log(component.Parent);onClickNode(component.Parent)}}>
                {
                  component.Child.map((child) =>
                    <MenuItem icon={SVG(component.childIcon[0])}  key={`${component.Parent}.${child}`} onMouseOver = {(e) => {onHover(child);e.stopPropagation()}} onMouseOut = {(e) => {outHover(child);e.stopPropagation()}}  onClick={(e)=>{console.log(child);onClickNode(child);e.stopPropagation()}}>{child}</MenuItem>
                  )
                }
               </SubMenu>
              )
            }
          </SubMenu>
          )
        }

      </Menu>
    </ProSidebar>
  );
  }else{
    return (
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        style={{
          bottom:0,
          position:'absolute',
        }}
      >

        <SidebarHeader>
          <div
          style={{
            padding: '24px',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          ><a href="#" onClick={()=>handleToggleSidebar()}><RiNodeTree/> Node Tree</a></div>

        </SidebarHeader>
        </ProSidebar>);
  }
};

export default NodeTreeView;
