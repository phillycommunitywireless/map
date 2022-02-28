import * as React from "react";

import { LatLngTuple } from "leaflet";
import { Marker, Popup, Circle } from "react-leaflet";
import { Node } from "./Map.types";

interface NodeMarkerProps {
  node: Node;
}

export default function NodeMarker({ node }: NodeMarkerProps) {
  const pos: LatLngTuple = [node.lat, node.long];

  return (
    <>
      <Marker key={node.nodeId} position={pos}>
        <Popup>
          <h1>
            Node {node.nodeId} ({node.nodeType.toLowerCase()} node)
          </h1>
          <h2>Device</h2>
          <p>
            Name: {node.device.name} <br />
            Range (distance): {node.device.signalRangeDistance}ft <br />
            Range (angle): {node.device.signalRangeAngle}° <br />
          </p>
        </Popup>
      </Marker>
      <Circle center={pos} radius={node.device.signalRangeDistance / 3} />
    </>
  );
}
