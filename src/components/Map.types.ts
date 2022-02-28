export interface Node {
  // This could be a MAC address, an installation ID we use internally, or a UUID generated just for this code
  nodeId: string|number,
  // The internal type of this node: only "mesh" or "hub" for now.
  nodeType: string,
  // User-facing label
  label?: string,
  // Lat/long
  lat: number,
  long: number,
  // Direction the antenna is facing, expressed as a compass heading with 0/360=North, 90=East, etc.
  direction: number,
  // Information about device installed at this node
  device: Device,
  // Other nodes that are meshed with this one, either by a relation or passed nodeId
  // Might be a single `uplink` node if we only have data on a single uplink device
  meshedWith?: Node[]|(string[]|number[]),
}

export interface Device {
  // Name of the device
  name: string,
  // Signal range - angle of coverage
  signalRangeAngle: number,
  // Signal range - distance out from the antenna
  signalRangeDistance: number,
}