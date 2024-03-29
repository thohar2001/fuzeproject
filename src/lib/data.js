export const BASE_URL = "https://api.sr.se/api/v2";
/**
 * Converts a date from unix timestamp format to a human readable String.
 * @param  {} date
 */
export function unixTimeToReadable(date) {
    let millis = String(date).substring(6, 19);
    let readableDate = new Date(Number(millis));
    // let theHour = readableDate.getHours();
    // readableDate.setHours(theHour+1);
    return readableDate.toLocaleString();
}


/**
 * Gets current longitude and latitude of the user from the web-browser.
 */
function getPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

/**
 * Calculates the distans in km between 2 cordinates.
 * @param  {String} lat1 Latitide 1.
 * @param  {String} lon1 Longitude 1.
 * @param  {String} lat2 Latitide 2.
 * @param  {String} lon2 Longitude 2.
 */
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

/**
 * Converts an angle from degress to radians.
 * 
 * @param  {Number} deg Angle in degrees.
 */
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
/**
 * Perform a fetch() operation to SR open API and retrieve all new traffic messages.
 */
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
      message.createddate = message.createddate.substring(11, 16);
    
    // Show exact location if the message contains an exact location
    if (message.exactlocation.length > 0) {
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

  // Sort traffic messages by distance
  result.sort(function (a, b) {
    return a.distance - b.distance;
  })
  return result;
}

/**
 * Performs a fetch() operation to an endpoint and returns the retrieved JSON object.
 * @param  {String} url Address of endpoint to access.
 */
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("response error");
  }
  return response.json();
}

/**
 * Perform a fetch() operation to SR open API and retrieve all channel ID:s
 */
export async function getAllChannelIds() {
  const endpoint = `${BASE_URL}/channels?format=json&size=500`;
  const response = await fetchJson(endpoint);
  const result = [];
  for (const channel of response.channels) {
    result.push(channel.id);
  }
  return result;
}
/**
 * 
 * Get top five tracks from P3 radio channel for indicated month.
 * 
 * @param  {Number} year Year for which to get toplist. E.g. 2019.
 * @param  {Number} month Month in year for which to get toplist. E.g. 1 for January.
 * @returns {Array.<String>} Each object has the format "artist:title¤plays".
 */
export async function getTopFiveTracks(year, month) {
  // 164 = P3
  const channels = [164];
  const trackCount = await countTrackOccurences(channels, year, month);
  return getTopTracks(trackCount, 5);
}

/**
 * Return number of plays for each track that have been played for indicated channel(s).
 * 
 * @param  {Array.<Number>} channel Channel ids of channels to retrieve data for.
 * @param  {Number} year Year to retrieve data for (e.g. 2018)
 * @param  {Number} month Month to retrieve data for (1=January)
 * @returns {Map.<String, Number>} Tracks are stored as key = "artist:song" and value = number of plays in this month.
 */
export async function countTrackOccurences(channels, year, month) {
  // We add one to month number because getDaysInMonth method is 1 based when it comes to month 
  const amountOfDays = getDaysInMonth(year, month);
  let firstOfMonth = new Date(year, month, 1);
  // make a map of artist name to how often that name occures
  const artistCount = {};
  for (const id of channels) {
    // Loop the same amount of times as there are days in selected month
    for(let i = 1; i<=amountOfDays;i++) {
      // Get playlist for current date
      const playlist = await getPlaylist(id, firstOfMonth.toLocaleString().split('T')[0]);
      // Loop over the current playlist, update the artistCount map
      for (const song of playlist) {
        if (artistCount[song.artist+":"+song.title]) {
          // if artist+title exists in map, add one to its value (play count)
          artistCount[song.artist+":"+song.title]++;
        } else {
          // if artist+title does not exist in map, set play count (value) to 1.
          artistCount[song.artist+":"+song.title] = 1;
        }
      }
      // For every iteration, add one day to the date.
      firstOfMonth.setDate(firstOfMonth.getDate() + 1);
    }
  }
  return artistCount;
}

/**
 * @param {Map.<String, Number>} artistCount Tracks stored as key = "artist:song" and value = number of plays in this month.
 * @param {Number} numResults How many tracks to include in result (e.g. 5 = top 5 list).
 */
export function getTopTracks(artistCount, numResults) {
  // make map into list of objects, sort them
  // and get the top names
  // return strings in the form of artist:song¤amount of plays
  const artistList = [];
  for (const name in artistCount) {
    artistList.push({ name: name, count: artistCount[name] });
  }
  artistList.sort((o1, o2) => o2.count - o1.count);
  return artistList.slice(0, numResults).map((o) => o.name + "¤" + o.count);
}


/**
 * Get the playlist for a specific radiochannel on a specific day.
 * 
 * @param  {Number} id Channel ID to get playlist for.
 * @param  {String} date Date to get pl aylist for.
 * @returns {Array.<Object>} All tracks that were played on date in question.
 */
export async function getPlaylist(id, date) {
  if (!Number.isInteger(id)) {
    throw new Error(`${id} is not a valid channel id`);
  }
  
  const endpoint = `${BASE_URL}/playlists/getplaylistbychannelid?id=${id}&startdatetime=${date}&format=json&size=500`;
  const response = await fetchJson(endpoint);
  
  return response.song;
}

/**
 * Perform a fetch() operation to SR open API and retrieve a list of all available radioprogram categories.
 * 
 * @returns {Array.<Object>} Objects containing fields 'id' (category id) and 'name' (categoryname).
 */
export async function getProgramCategories() {
  const endpoint = `${BASE_URL}/programcategories?format=json&pagination=false&size=500`;
  const response = await fetchJson(endpoint);
  const result = [];

  for (const program of response.programcategories) {
    result.push({id: program.id, name: program.name});
  }
  return result;
}

/**
 * Get the number of days in specified moth of specified year.
 * 
 * @param {Number} year Year (e.g. 2018)
 * @param {Number} month Month (e.g. 3=March)
 */
export function getDaysInMonth(year, month) {
  // Here Months are 1 based.
  // Because we enter 0 as day, it will return amount of days
  // in previous month. Because of this, we have to add 1 to the month. 
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Perform a fetch() operation to SR open API and retrieve all programs.
 * 
 * @returns [Array.<Object>] of all programs
 */
export async function getAllPrograms() {
  const endpoint = `${BASE_URL}/programs/index?format=json&filter=program.haspod&filtervalue=true&pagination=false`;

  const response = await fetchJson(endpoint);
  const result = [];
  for (const program of response.programs) {
    result.push(program);
  }
  return result;
}

/**
 * Perform a fetch() operation to SR open API and retrieve all Podcasts for a specified radioprogram with specified length.
 * 
 * @param  {Number} programid Programme ID of programme to get podcats for.
 * @param  {Number} durationMin Minimum length of podcast in minutes.
 * @param  {Number} durationMax Maximum length of podcast in minutes.
 * @returns [Array.<Object>] All podcasts. 
 */
export async function getAllPods(programid, durationMin, durationMax) {
  const endpoint = `${BASE_URL}/podfiles?programid=${programid}&pagination=false&format=json`;
  const response = await fetchJson(endpoint);
  //console.log("url for podcastlist fetch=" + endpoint)
  const allPods = [];
  for(const podcast of response.podfiles) {
    podcast.lengthInMinutes = Math.floor((podcast.duration/60).toFixed(2));
    if (durationMin != null && durationMax != null) {
      if (podcast.duration >= (60*durationMin) && podcast.duration <= (60*durationMax)) {
        allPods.push(podcast)
      }
    } else {
      allPods.push(podcast)
    }
  }
  return allPods;
}
