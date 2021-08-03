
function loadPages(){
  $("#heading").load("./HtmlPages/heading.html", function(){
    console.log("heading loaded");
    headingLoaded = true;
    //if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));
  });           

  $("#sidebar").load("./HtmlPages/sidebar.html", function(){
    console.log("sidebar loaded");
    sidebarLoaded = true;
    $("#sidebar-contacts").addClass("active");
    //if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));      

    //$("#sidebar-check-expirations").hide(); //disable check expirarion function
  });

  $("#rsv-page").load("./HtmlPages/rsvPage.html", function(){
    console.log("rsv-page loaded");
    rsvPageLoaded = true;
    //if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));          
  });

  $("#expire-page").load("./HtmlPages/expirePage.html", function(){
    console.log("expire-page loaded");
    expirePageLoaded = true;
    if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));          
  });        

  $("#query-sessions-page").load("./HtmlPages/sessionPage.html", function(){
    console.log("session-page loaded");
    sessionPageLoaded = true;
    //if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));          
  });        

  $("#admissionFee-page").load("./HtmlPages/adminFeePage.html", function(){
    console.log("admissionFee-page loaded");
    adminFeePageLoaded = true;
    //if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));          
  });        

}

function show_rsv_page(){
  $(".page-wrapper").hide(); // hide all pages with page-wrapper class
  $(".sidebar-item").css("color","white")

  $("#rsv-page").show(); 
  $("#ml-Sidebar-check-reservations").css("color", "#FBF279");
  //$("#ml-Sidebar-check-expirations").css("color", "white");            
  //$("#sidebar-check-reservations-icon").css("color", "#FBF279");            
  //$("#sidebar-check-expirations-icon").css("color", "white");            
  if (!index_is_loaded) {
    checkReservations();
    index_is_loaded = true;     
  }
}

function show_expire_page(){
  $(".page-wrapper").hide();
  $(".sidebar-item").css("color","white")

  $("#expire-page").show();   
  //$("#ml-Sidebar-check-reservations").css("color", "white");                      
  $("#ml-Sidebar-check-expirations").css("color", "#FBF279");
  //$("#sidebar-check-reservations-icon").css("color", "white");              
  //$("#sidebar-check-expirations-icon").css("color", "#FBF279");
  if (!expire_is_loaded) {
    if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));             
    checkExpirations();
    expire_is_loaded = true;     
  }
} 

function show_query_sessions_page(){
  $(".page-wrapper").hide();
  $(".sidebar-item").css("color","white")

  $("#query-sessions-page").show();   
  //$("#ml-Sidebar-check-reservations").css("color", "white");                      
  $("#ml-Sidebar-query-sessions").css("color", "#FBF279");
  if (!query_sessions_is_load) {
    querySessions();
    query_sessions_is_load = true;     
  }
}            

function show_query_admissionFee_page(){
  $(".page-wrapper").hide();
  $(".sidebar-item").css("color","white")

  $("#admissionFee-page").show();   
  //$("#ml-Sidebar-check-reservations").css("color", "white");                      
  $("#ml-Sidebar-query-admissionFee").css("color", "#FBF279");
  if (!query_admissionFee_is_load) {
    queryAdmissionFee();
    query_admissionFee_is_load = true;     
  }
} 

function show_query_productSales_page(){
  $(".page-wrapper").hide();
  $(".sidebar-item").css("color","white")

//          $("#admissionFee-page").show();   
  //$("#ml-Sidebar-check-reservations").css("color", "white");                      
  $("#ml-Sidebar-query-productSales").css("color", "#FBF279");
//          if (!query_admissionFee_is_load) {
//            queryAdmissionFee();
//            query_admissionFee_is_load = true;     
//          }
}         


function checkReservations(){
  var startDateStr = $("#rsvQueryStartDate").val();
  var endDateStr = $("#rsvQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=00" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr;

  //console.log(apiUrl);

  $.loading.start('讀取資料');
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      //returnFromAPI = JSON.parse(JSON.stringify(returnData));
      //console.log(returnFromAPI[0][3]);

      rsvResult = returnData;

      for (i=0; i< rsvResult.length; i++){
        rsvResult[i][4] = rsvResult[i][3].substr(11,5)+'~'+rsvResult[i][4].substr(11,5);
        rsvResult[i][3] = rsvResult[i][3].substr(0,10);
      }


      reservationsTable.clear();
      reservationsTable.rows.add(rsvResult).draw();
      $.loading.end();
      $("#ml-Sidebar-check-reservations").css("color", "#FBF279");                
      $("#sidebar-check-reservations-icon").css("color", "#FBF279");                
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}

function checkExpirations(){
  var startDateStr = $("#expQueryStartDate").val();
  var endDateStr = $("#expQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=01" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr;

  //console.log(apiUrl);

  $.loading.start('讀取資料');
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      expResult = returnData;

      for (i=0; i< expResult.length; i++){
        expResult[i][5] = expResult[i][5].substr(0,10);
        expResult[i][6] = expResult[i][6].substr(0,10);
        expResult[i][7] = expResult[i][7].substr(0,10);
      }

      expirationsTable.clear();
      expirationsTable.rows.add(expResult).draw();
      $.loading.end();
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}

// used in the following querySessions()       
async function processContractSessionHistory() {

  var apiUrl;

  var courseKeys = Object.keys(courseSettings);
  if (courseKeys.length==0){
    $.loading.end();
    $.loading.start("讀取課程設定");
    apiUrl = apiUrlBase + "?API=05"; 
    await $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function(returnData) {
        for (var i=0; i< returnData.length; i++){
          courseSettings[returnData[i][0]] = returnData[i][1];
        }
      },

      error: function() {
        alert("Database READ ERROR!!!");
      }
    });
  }

  // collect contracts need to be queried
  var contractsToQuery=[];
  for (i=0; i< querySessionsResult.length; i++){
      contractsToQuery.push(querySessionsResult[i][5])
  }
  //console.log(contractsToQuery);          

  for (var j=0; j<contractsToQuery.length;j++) {
    if (contractSessionHistory[querySessionsResult[j][4]]== undefined) {
      apiUrl = apiUrlBase + "?API=04" + "&contractId=" + contractsToQuery[j]; 

      $.loading.end();$.loading.start("讀取合約:"+contractsToQuery[j]);
      await $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function(returnData) {
          contractSessionHistory[contractsToQuery[j]] = [];
          for (var i=0; i < returnData.length; i++) {
            contractSessionHistory[contractsToQuery[j]].push( returnData[i][0].substr(0,10) + " " + returnData[i][0].substr(11,5)+'~'+returnData[i][1].substr(11,5) );
          }
        },

        error: function() {
          alert("Database READ ERROR!!!");
        }
      }); 
      //console.log(contractsToQuery[j], "  done"); 
    }
  }

  var currentDate="0000-00-00";
  var sessionIndexForDay = 1;
  var amountForDay=0;
  var storeId = "TW-Xinyi";
  for (i=0; i< querySessionsResult.length; i++){

    // 處理日期和時間
    querySessionsResult[i][1] = querySessionsResult[i][0].substr(11,5)+'~'+querySessionsResult[i][1].substr(11,5);
    querySessionsResult[i][0] = querySessionsResult[i][0].substr(0,10);



    // 合約時間_月 
    querySessionsResult[i][8] = courseSettings[querySessionsResult[i][7]];

    // 合約簽訂日期，Database ContractForms 裡的 ProcessTime
    querySessionsResult[i][9] = querySessionsResult[i][9].substr(0,10);

    // 合約開始日期，Database ContractForms 裡的 CourseSessionFirstStartDate           
    querySessionsResult[i][10] = querySessionsResult[i][10].substr(0,10);

    // 處理 合約到期日期
      // 合約到期日期，Database ContractForms 裡的 ExpirationDate 
      querySessionsResult[i][11] = querySessionsResult[i][11].substr(0,10);       

      // 合約延伸到期日期，Database ContractForms 裡的 ExpirationDate 
      querySessionsResult[i][31] = querySessionsResult[i][31].substr(0,10);   

      // 如果有延伸，結合兩個日期
      if (querySessionsResult[i][31] > "0001-01-01") {
        querySessionsResult[i][11] = querySessionsResult[i][11] + "<br>Ext. " + querySessionsResult[i][31];
      }


    // 處理 合約已進行(月)
    var startDate = new Date(querySessionsResult[i][9]);
    var endDate = new Date(querySessionsResult[i][0]);
    querySessionsResult[i][12] = Math.floor((endDate - startDate)/(864000*30))/100;

    // 處理 合約總價(未稅)
    //querySessionsResult[i][13] = Math.floor(parseFloat(querySessionsResult[i][13])*100)/100;  

    // 處理 合約總價(未稅)
    querySessionsResult[i][14] = parseFloat(querySessionsResult[i][13])/1.05;  

    // 處理 合約已執行堂數                
    var sessionDateTime = querySessionsResult[i][0]+ " " + querySessionsResult[i][1];
    //if (contractSessionHistory[querySessionsResult[i][4]].length >0){
    //  console.log(contractSessionHistory[querySessionsResult[i][4]].indexOf(sessionDateTime)+1);
    //}

    querySessionsResult[i][19] =contractSessionHistory[querySessionsResult[i][5]].indexOf(sessionDateTime)+1;

    // 處理 開始後來店頻率，因為會用到 querySessionsResult[i][18]，所以才放在之後，
    var usedMonth = (querySessionsResult[i][12] == 0)?1:querySessionsResult[i][12];
    querySessionsResult[i][16] = parseFloat(querySessionsResult[i][19])/usedMonth;


    // 處理 合約剩餘堂數                
    querySessionsResult[i][21] = querySessionsResult[i][18] - querySessionsResult[i][19];


    // 處理 課程單價(含稅)               
    querySessionsResult[i][22] = parseFloat(querySessionsResult[i][13])/parseFloat(querySessionsResult[i][18]);                 

    // 處理 課程單價(未稅)              
    querySessionsResult[i][23] = parseFloat(querySessionsResult[i][14])/parseFloat(querySessionsResult[i][18]);                

    // 合約退會堂數, 退費金額/課程單價(含稅)
    querySessionsResult[i][20] = querySessionsResult[i][20]/querySessionsResult[i][22];               


    // 處理 合約已認列金額(含稅)
    querySessionsResult[i][24] = (querySessionsResult[i][19] * parseFloat(querySessionsResult[i][13])) / 
                                 parseFloat(querySessionsResult[i][18]);

    // 處理 合約已認列金額(未稅)
    querySessionsResult[i][25] = querySessionsResult[i][24] / 1.05;

    // 處理 合約未認列金額(含稅)
    querySessionsResult[i][26] = querySessionsResult[i][13] - querySessionsResult[i][24];

    // 處理 合約未認列金額(未稅)
    querySessionsResult[i][27] = querySessionsResult[i][14] - querySessionsResult[i][25];                
    if ( querySessionsResult[i][2] != storeId) {
      console.log("store change");
      storeId = querySessionsResult[i][2];
      currentDate = "0000-00-00";
    }

    if (querySessionsResult[i][0] > currentDate) {
      //console.log("new day");
      currentDate = querySessionsResult[i][0];
      sessionIndexForDay = 1;
      querySessionsResult[i][17] = sessionIndexForDay++; 
      // 當日認列金額(含稅)
      querySessionsResult[i][28] = querySessionsResult[i][22];


    } else {
      // 堂數排序 not implement yet
      querySessionsResult[i][17] = sessionIndexForDay++; 
      querySessionsResult[i][28] = querySessionsResult[i][22]+querySessionsResult[i-1][28];
    }

    // 當日認列金額(未稅)
    querySessionsResult[i][29] = querySessionsResult[i][28]/1.05;  

  }

  querySessionsTable.clear();
  querySessionsTable.rows.add(querySessionsResult).draw();
  $.loading.end();                    
}

function querySessions(){

  var startDateStr = $("#sessionQueryStartDate").val();
  var endDateStr = $("#sessionQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=03" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr; // API=03 為只搜尋單一合約的 sessions

  //console.log(apiUrl);

  $.loading.start('讀取資料');
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      //returnFromAPI = JSON.parse(JSON.stringify(returnData));
      //console.log(returnFromAPI[0][3]);

      //querySessionsResult = JSON.parse(JSON.stringify(returnData));
      var querySessionsResultRaw = JSON.parse(JSON.stringify(returnData));
      console.log(querySessionsResultRaw);
      querySessionsResult=[];
      for (var i=0; i< querySessionsResultRaw.length; i++){
        if (querySessionsResultRaw[i][30]==true) {
          querySessionsResult.push(querySessionsResultRaw[i]);
        }
      }
      processContractSessionHistory();
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}        

// used in the following queryAdmissionFee()       
async function processAdmissionFee() {

  var apiUrl;

  var courseKeys = Object.keys(courseSettings);
  if (courseKeys.length==0){
    $.loading.end();
    $.loading.start("讀取課程設定");
    apiUrl = apiUrlBase + "?API=05"; 
    await $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function(returnData) {
        for (var i=0; i< returnData.length; i++){
          courseSettings[returnData[i][0]] = returnData[i][1];
        }
      },

      error: function() {
        alert("Database READ ERROR!!!");
      }
    });
  }
                
  for (var i=0; i < queryAdmissionFeeResult.length; i++) {
   // 處理日期和時間
    queryAdmissionFeeResult[i][1] = queryAdmissionFeeResult[i][0].substr(11,5);
    queryAdmissionFeeResult[i][0] = queryAdmissionFeeResult[i][0].substr(0,10);

    // 合約時間_月 
    queryAdmissionFeeResult[i][8] = courseSettings[queryAdmissionFeeResult[i][7]];

    // 合約簽訂日期，Database ContractForms 裡的 ProcessTime
    queryAdmissionFeeResult[i][9] = queryAdmissionFeeResult[i][9].substr(0,10);   

    // 已認列入會費(未稅)
    queryAdmissionFeeResult[i][11] = queryAdmissionFeeResult[i][10]/1.05;    

    // 發票種類
    if (queryAdmissionFeeResult[i][12]!=null) {
      if (queryAdmissionFeeResult[i][12].includes("Duplicate")) queryAdmissionFeeResult[i][12] = "二聯式發票";
      if (queryAdmissionFeeResult[i][12].includes("Triplicate")) queryAdmissionFeeResult[i][12] = "三聯式發票";
    }

    // 發票發行日期
    queryAdmissionFeeResult[i][13] = queryAdmissionFeeResult[i][13].substr(0,10);              
    if (queryAdmissionFeeResult[i][13]=='0001-01-01') queryAdmissionFeeResult[i][13] = "";



  }

  queryAdmissionFeeTable.clear();
  queryAdmissionFeeTable.rows.add(queryAdmissionFeeResult).draw(); 
  $.loading.end();          

}

function queryAdmissionFee(){

  var startDateStr = $("#admissionFeeQueryStartDate").val();
  var endDateStr = $("#admissionFeeQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=06" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr; // API=03 為只搜尋單一合約的 sessions

  //console.log(apiUrl);

  $.loading.start('讀取資料');
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      var queryAdmissionFeeResultRaw = JSON.parse(JSON.stringify(returnData));
      console.log(queryAdmissionFeeResultRaw);
      queryAdmissionFeeResult=[];
      for (var i=0; i< queryAdmissionFeeResultRaw.length; i++){
          queryAdmissionFeeResult.push(queryAdmissionFeeResultRaw[i]);
      }

      processAdmissionFee();              
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}        

