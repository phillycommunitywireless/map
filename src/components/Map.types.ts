export interface Node {
  // This could be a MAC address, an installation ID we use internally, or a UUID generated just for this code
  id: string|number,
  // User-facing label
  label?: string,
  // Lat/long
  lat: number,
  long: number,
  // Direction the antenna is facing. How do we calculate these during install 
  // and record it in a standard way? What do maps people use for angles
  direction: number,
  // Information about device installed here
  device: Device,
  // Other nodes that are meshed with this one, either a relation or ID
  meshedWith: Node[]|(string[]|number[]),
}

export interface Device {
  // Name of the device
  name: string,
  // Signal range (angle)
  angleRange: number,
  // Signal range (distance)
  distanceRange: number,
}