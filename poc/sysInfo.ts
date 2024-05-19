const si = require('systeminformation')

si.dockerAll()
  .then((data: any) => console.log(data))
  .catch((error: any) => console.error(error))

// si.processes()
//   .then((data: any) => console.log(data))
//   .catch((error: any) => console.error(error))

// si.wifiNetworks()
//   .then((data: any) => console.log(data))
//   .catch((error: any) => console.error(error))

// si.networkInterfaces()
//   .then((data: any) => console.log(data))
//   .catch((error: any) => console.error(error))

// promises style - new since version 3
// si.cpu()
//   .then((data: any) => console.log(data))
//   .catch((error: any) => console.error(error))

// {
//     manufacturer: "Apple",
//         brand: "M2",
//     vendor: "Apple",
//     family: "-634136515",
//     model: "",
//     stepping: "2",
//     revision: "",
//     voltage: "",
//     speed: 2.4,
//     speedMin: 2.4,
//     speedMax: 2.4,
//     governor: "",
//     cores: 8,
//     physicalCores: 8,
//     performanceCores: 4,
//     efficiencyCores: 4,
//     processors: 1,
//     socket: "SOC",
//     flags: "",
//     virtualization: true,
//     cache: {
//     l1d: 131072,
//         l1i: 65536,
//         l2: 4194304,
//         l3: null,
// },
// }
