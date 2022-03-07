import ReactLoading from "react-loading";
import axios from "axios";
import Navigation from "./Navbar";
import "./Graph.css";

function Graph2() {
  // the graph configuration, just override the ones you need
  var myConfig = {
    // "automaticRearrangeAfterDropNode": true,
    collapsible: false,
    directed: true,
    focusAnimationDuration: 0.1,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 900,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    initialZoom: 0.5,
    maxZoom: 12,
    minZoom: 0.05,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    // "staticGraph": true,
    // "staticGraphWithDragAndDrop": true,
    width: 1900,
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
      highlightColor: "red",
      highlightFontSize: 25,
      highlightFontWeight: "bold",
      highlightStrokeColor: "red",
      highlightStrokeWidth: 1.5,
      labelPosition: "top",
      mouseCursor: "grab",
      opacity: 0.9,
      renderLabel: true,
      size: 500,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "https://www.svgrepo.com/show/1296/student-computer.svg",
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
      renderLabel: false,
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
  
  const onClickNode = function (nodeId, node) {
    window.alert(
      "Clicked node " + nodeId + " . Extra information " + node["information"]
    );
  };

  return (
    <Graph
      id="graph-id2" // id is mandatory
      data={data[1]}
      config={myConfig}
      onClickNode={onClickNode}
    />
  );
}

export default Graph2;