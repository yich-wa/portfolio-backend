// import * as IPData from 'ipdata'

// export async function getLocatioFromIp(ip) {
//   try {
//     console.log('wyc-IPdata', IPData)
//     const ipdata = new IPData(
//       'adc3b20f4d8a216bc65dd28779752823722dbb08c39b6233c745ce9c'
//     )
//     const locationData = await ipdata.lookup(ip).then((data) => data)
//     console.log('wyc-locationData', locationData)
//     return locationData
//   } catch (err) {
//     console.error(err)
//   }
// }

import { SuperfaceClient } from "@superfaceai/one-sdk";

const sdk = new SuperfaceClient();

export async function getLocationFromIp(ip) {
  // Load the profile
  const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");

  // Use the profile
  const result = await profile.getUseCase("IpGeolocation").perform(
    {
      ipAddress: ip
    },
    {
      provider: "ipdata",
      security: {
        apikey: {
          apikey: "adc3b20f4d8a216bc65dd28779752823722dbb08c39b6233c745ce9c"
        }
      }
    }
  );

  // Handle the result
  try {
    const data = result.unwrap();
    return data;
  } catch (error) {
    console.error(error);
  }
}