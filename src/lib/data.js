// NB! This code is not very good by design
// it should not be too copy-paste friendly =)

export const BASE_URL = "https://api.sr.se/api/v2";

export function unixTimeToReadable(date) {
    let millis = String(date).substring(6, 19);
    let readableDate = new Date(Number(millis));
    // let theHour = readableDate.getHours();
    // readableDate.setHours(theHour+1);
    
    return readableDate.toLocaleString();
}

// gets current location of the user
function getPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}
// calculates the distans between 2 cordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export async function getTrafficMessages() {

  // Get geographic coordinates of user
  let position = await getPosition();
  let userLatitude = position.coords.latitude;
  let userLongitude = position.coords.longitude;

  const endpoint = `${BASE_URL}/traffic/messages?format=json&size=500`;
  const response = await fetchJson(endpoint);
  const result = [];

  for (const message of response.messages) {
      // Convert json unix /Date format to a more readable time format yy-MM-dd hh:mm first
      message.createddate = unixTimeToReadable(message.createddate);
      
      // Get today's date in format yy-MM-dd
      let todayDate = new Date().toLocaleString().substring(0, 10);
      
      // Compare the new readable date with today's date
      // Show only today's messages (skip if message date and today's date don't match).
      if(!(message.createddate.substring(0, 10) == (todayDate))) {
        continue;
      }

      // Now convert the date again, so it only shows hours, minutes and seconds (hh:mm)
      message.createddate = message.createddate.substring(11, 20);
    
    // Show exact location if the message contains an exact location
    if (message.exactlocation.length < 0) {
      result.push(message);

    }
    // If the message doesn't contain exact location: set the title (county/district) as exact location instead.
    else {
      message.exactlocation = message.title;
      result.push(message);
    }
    // Add distance to accident
    result[result.length-1]["distance"] = getDistanceFromLatLonInKm(userLatitude, userLongitude, message.latitude, message.longitude)
  }
  return result;
}

export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("response error");
  }
  return response.json();
}

export async function getAllChannelIds() {
  const endpoint = `${BASE_URL}/channels?format=json&size=500`;
  const response = await fetchJson(endpoint);
  const result = [];
  for (const channel of response.channels) {
    result.push(channel.id);
  }
  return result;
}

export async function getTopFiveArtists(year, month) {
  
  const channels = [164];
  const artistCount = await countArtistOccurences(channels, year, month);
  return getTopArtists(artistCount, 5);
}

export async function countArtistOccurences(channels, year, month) {
  const amountOfDays = getDaysInMonth(year, month);
  let firstOfMonth = new Date(year, month, 1);
  // make a map of artist name to how often that name occures
  const artistCount = {};
  for (const id of channels) {
    // Loop the same amount of times as there are days in selected month
    for(let i = 1; i<=amountOfDays;i++) {
      // For every iteration, add one day to the date.
      firstOfMonth.setDate(firstOfMonth.getDate() + 1);
      // Get playlist for current date
      const playlist = await getPlaylist(id, firstOfMonth.toLocaleString().split('T')[0]);
      // Loop over the current playlist, update the artistCount map
      for (const song of playlist) {
        if (artistCount[song.artist+":"+song.title]) {
          artistCount[song.artist+":"+song.title]++;
        } else {
          artistCount[song.artist+":"+song.title] = 1;
        }
      }
    }
  }
  return artistCount;
}

// Get playlist for one day/date
export async function getPlaylist(id, date) {
  if (!Number.isInteger(id)) {
    throw new Error(`${id} is not a valid channel id`);
  }
  
  const endpoint = `${BASE_URL}/playlists/getplaylistbychannelid?id=${id}&startdatetime=${date}&format=json&size=500`;
  const response = await fetchJson(endpoint);
  
  return response.song;
}

export async function getProgramCategories() {
  const endpoint = `${BASE_URL}/programcategories?format=json&pagination=false&size=500`;
  const response = await fetchJson(endpoint);
  const result = [];

  for (const program of response.programcategories) {
    result.push({id: program.id, name: program.name});
  }
  return result;
}

export function getTopArtists(artistCount, numResults) {
  // make map into list of objects, sort them
  // and get the top names
  const artistList = [];
  for (const name in artistCount) {
    artistList.push({ name: name, count: artistCount[name] });
  }
  artistList.sort((o1, o2) => o2.count - o1.count);
  return artistList.slice(0, numResults).map((o) => o.name + "¤" + o.count);
}

export function getDaysInMonth(year, month) {
  // Here January is 1 based
  return new Date(year, month, 0).getDate();
}


export async function getAllPrograms() {
  const endpoint = `${BASE_URL}/programs/index?format=json&filter=program.haspod&filtervalue=true&pagination=false`;

  const response = await fetchJson(endpoint);
  const result = [];
  for (const program of response.programs) {
    result.push(program);
  }
  return result;
}

export async function getAllPods(programid, durationMin, durationMax) {
  const endpoint = `${BASE_URL}/podfiles?programid=${programid}&pagination=false&format=json`;
  const response = await fetchJson(endpoint);
  console.log("url for podcastlist fetch=" + endpoint)
  const allPods = [];
  for(const program of response.podfiles) {
    if (durationMin != null && durationMax != null) {
      if (program.duration >= (60*durationMin) && program.duration <= (60*durationMax)) {
        allPods.push(program)
      }
    } else {
      allPods.push(program)
    }
  }
  return allPods;
}
