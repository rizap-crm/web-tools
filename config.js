var local_api = true;

if (local_api) {
  var apiUrlBase = "http://localhost:5000/";
} else {
  var apiUrlBase = "https://api-for-sql.herokuapp.com/";
}

console.log(apiUrlBase);   