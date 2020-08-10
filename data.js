let response = [];
const userResponsesSection = document.querySelector('#user-responses')

const fetchUserResponses = async () => {
  const response = await fetch(
    'http://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vR3T3S3ayWO_gCTiLrdY5TtwJeJO3_Cb-d20VTPd6Yx6MVyCq1YlGC2ZHFZOABGyDWCp1MrrMJUo3Qm/pub?output=csv'
  );
  const data = await response.text();
  const results = Papa.parse(data,{header:true})
  responses = results.data
};

// How often do you go to a QSR Restaurant: "Once a month or less"
// How old are you?: "75"
// Timestamp: "8/9/2020 18:56:04"
// Upload a picture of your favorite plate from this restaurant: "https://drive.google.com/open?id=17hvyZGK5GlmXKhSUbi3vkHDtIJ1WCPJr"
// What is your favorite QSR?: "Burger King"
// What is your favorite non-QSR Restaurant?: "Zucca"
// What is your first and last name?: "Alexis Matheus"
// What type of food is this Restaurant?: "Italian"
// When was the last time you went to this Restaurant?: "More than a month 




const renderUserResponse = userResponse => {
  const qsrFrequency = userResponse['How often do you go to a QSR Restaurant'];
  const age = userResponse["How old are you?"];
  const qsrFavorite = userResponse["What is your favorite QSR?"];
  const nonqsrRestaurant = userResponse["What is your favorite non-QSR Restaurant?"];
  const firstandLastName = userResponse["What is your first and last name?"];
  const pictureOfPlate = userResponse["Upload a picture of your favorite plate from this restaurant"];
  const foodType = userResponse["What type of food is this Restaurant?"];
  const restaurantLastTime = userResponse["When was the last time you went to this Restaurant?"];
  const googlePhotoId = pictureOfPlate.split('id=')[1]; 
  

  return `
  <div class = user-response>
    <h2>I am ${firstandLastName} and I am ${age} years old</h2>
    <h3>My favorite QSR Restaurant is ${qsrFavorite} and I go there ${qsrFrequency}</h3>
    <h4>But my favorite Restaurant overall is ${nonqsrRestaurant}. It is a ${foodType} and the last time I went there was ${restaurantLastTime}</h4>
    <img src="https://drive.google.com/thumbnail?id=${googlePhotoId}" alt="favorite plate" />
  </div>
  `;
};

const fetchandShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponsesSection.innerHTML = allUserResponsesHTML;
};

fetchandShowResponses();