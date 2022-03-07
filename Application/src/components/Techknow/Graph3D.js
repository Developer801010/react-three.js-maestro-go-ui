import React, { Component, useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import ReactLoading from "react-loading";import { Mesh, BoxGeometry, MeshLambertMaterial, SphereGeometry } from "three";

import axios from "axios";
import reactDom from "react-dom";
import * as THREE from "three";

function Graph3D(){

    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true);

	useEffect(() => {
        axios
          .get("https://monolithaipcg-backend.herokuapp.com/api/getdata", {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            setData(res.data);
            setLoading(false);
          });
      }, []);
      const Example = ({ type, color }) => (
        <ReactLoading type={"bars"} color={"#ffffff"} height={667} width={375} />
      );
      if (isLoading) {
        return <Example />;
      }

      return (
        <ForceGraph3D
            backgroundColor={"#4287f5"}
            graphData={data[1]}

            // linkDirectionalParticles={0.5}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleColor={() => "red"}
            linkDirectionalArrowLength={5}
            linkCurvature={0.5}
            linkOpacity={1}
            linkColor={"#111111"}

            nodeLabel="id"

            nodeThreeObject={({ id }) =>
            new Mesh(
                new SphereGeometry(
                    10, 10, 10
                ),
                new MeshLambertMaterial({
                    color: "black",
                    transparent: true,
                    opacity: 1
                })
            )
            }
        />
        );
}
export default Graph3D