
async function loadPages(){
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

  $("#product-page").load("./HtmlPages/productPage.html", function(){
    console.log("product-page loaded");
    productPageLoaded = true;
    //if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));          
  }); 
  
  $("#contract-page").load("./HtmlPages/contractPage.html", function(){
    console.log("contract-page loaded");
    contractPageLoaded = true;
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
    rsvCheck();
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
    expCheck();
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
    sessionCheck();
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
    admissionFeeCheck();
    query_admissionFee_is_load = true;     
  }
} 

function show_query_productSales_page(){
  $(".page-wrapper").hide();
  $(".sidebar-item").css("color","white")

  $("#product-page").show();   
  //$("#ml-Sidebar-check-reservations").css("color", "white");                      
  $("#ml-Sidebar-query-productSales").css("color", "#FBF279");
  if (!query_product_is_load) {
    productCheck();
    query_product_is_load = true;     
  }  
}         

// 定義以下 array 的 count function，就可以使用 [1, 2, 3, 5, 2, 8, 9, 2].count(2) => 3
Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});

// 定義以下 array 的 sum function，就可以使用 [1, 2, 3, 5, 2, 8, 9, 2].sum() => 32
Object.defineProperties(Array.prototype, {
    sum: {
        value: function(value) {
            let sum =0;
            for (var i=0; i<this.length;i++){
              sum += this[i];
            }
            return sum;
        }
    }
});


async function show_query_contracts_page(){
  console.log("Show Year Contract");
  
  $(".page-wrapper").hide();
  $(".sidebar-item").css("color","white")

  $("#contract-page").show();   
  
  var queryYear = $("#contractQueryStartDate").val();
  //var queryYear = "2020";
  var queryYear_plus1 = (parseInt(queryYear) + 1).toString();
  var monthsInYear = ["-04","-05","-06","-07","-08","-09","-10","-11","-12","-01","-02","-03"];
  for (var i=0; i< monthsInYear.length; i++){
    monthsInYear[i] = (i<9)? queryYear+monthsInYear[i]:queryYear_plus1+monthsInYear[i];
    
  }
  
  console.log(monthsInYear);
  
  apiUrl = apiUrlBase + "?API=08"; 

  if (Object.keys(contractSessionHistory).length==0){
    await $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function(returnData) {
        //contractSessionHistory[contractsToQuery[j]] = [];
        for (var i=0; i < returnData.length; i++) {      
          contractSessionHistory[returnData[i][0]]=[];
        }

        for (var i=0; i < returnData.length; i++) {
          //contractSessionHistory[returnData[i][0]].push( returnData[i][1].substr(0,10) + " " + returnData[i][1].substr(11,5)+'~'+returnData[i][2].substr(11,5) );
          contractSessionHistory[returnData[i][0]].push( returnData[i][1].substr(0,7) );
        }
        
      },

      error: function() {
        alert("Database READ ERROR!!!");
      }
    }); 

  }

  var contractNos = Object.keys(contractSessionHistory);
  sessionsInContract = {};

  // Process sessions in each month
  for (var i=0; i < contractNos.length; i++){
    var sessionDetails = contractSessionHistory[contractNos[i]];
    sessionsInContract[contractNos[i]]=[];
    for (var j=0; j <monthsInYear.length; j++) {
      sessionsInContract[contractNos[i]].push(sessionDetails.count(monthsInYear[j]));
    }
    sessionsInContract[contractNos[i]].push(-1*sessionsInContract[contractNos[i]].sum());
  }  
  
  apiUrl = apiUrlBase + "?API=09&ContractYear="+queryYear;  
  await $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      contractResult = JSON.parse(JSON.stringify(returnData));
      console.log(contractResult);
      
      contractDataTable.clear();
      contractDataTable.rows.add(contractResult).draw();
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });     
  
}

function rsvCheck(){
  var startDateStr = $("#rsvQueryStartDate").val();
  var endDateStr = $("#rsvQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=00" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr;

  //console.log(apiUrl);

  $.loading.start($("#ml-讀取資料").text());
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


      rsvDataTable.clear();
      rsvDataTable.rows.add(rsvResult).draw();
      $.loading.end();
      $("#ml-Sidebar-check-reservations").css("color", "#FBF279");                
      $("#sidebar-check-reservations-icon").css("color", "#FBF279");                
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}

function expCheck(){
  var startDateStr = $("#expQueryStartDate").val();
  var endDateStr = $("#expQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=01" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr;

  //console.log(apiUrl);

  $.loading.start($("#ml-讀取資料").text());
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

      expDataTable.clear();
      expDataTable.rows.add(expResult).draw();
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
    $.loading.start($("#ml-讀取課程設定").text());
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

  if (Object.keys(contractSessionHistory).length==0){
    // read all sessions of all contracts
    apiUrl = apiUrlBase + "?API=08"; 
    await $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function(returnData) {
        //contractSessionHistory[contractsToQuery[j]] = [];
        for (var i=0; i < returnData.length; i++) {      
          contractSessionHistory[returnData[i][0]]=[];
        }

        for (var i=0; i < returnData.length; i++) {
          contractSessionHistory[returnData[i][0]].push( returnData[i][1].substr(0,10) + " " + returnData[i][1].substr(11,5)+'~'+returnData[i][2].substr(11,5) );
        }
      },

      error: function() {
        alert("Database READ ERROR!!!");
      }
    });   
    
    console.log(contractSessionHistory);
  }
  
// No need anymore, since all sessions are read in advance
// collect contracts need to be queried
//  var contractsToQuery=[];
//  for (i=0; i< sessionResult.length; i++){
//      contractsToQuery.push(sessionResult[i][5])
//  }
  //console.log(contractsToQuery);          

//  for (var j=0; j<contractsToQuery.length;j++) {
//    if (contractSessionHistory[sessionResult[j][5]]== undefined) {
//      apiUrl = apiUrlBase + "?API=04" + "&contractId=" + contractsToQuery[j]; 
//
//      $.loading.end();$.loading.start($("#ml-讀取合約").text()+":"+contractsToQuery[j]);
//      await $.ajax({
//        url: apiUrl,
//        type: "GET",
//        dataType: "json",
//        success: function(returnData) {
//          contractSessionHistory[contractsToQuery[j]] = [];
//          for (var i=0; i < returnData.length; i++) {
//            contractSessionHistory[contractsToQuery[j]].push( returnData[i][0].substr(0,10) + " " + returnData[i][0].substr(11,5)+'~'+returnData[i][1].substr(11,5) );
//          }
//        },
//
//        error: function() {
//          alert("Database READ ERROR!!!");
//        }
//      }); 
//      //console.log(contractsToQuery[j], "  done"); 
//    }
//  }

  var currentDate="0000-00-00";
  var sessionIndexForDay = 1;
  var amountForDay=0;
  var storeId = "TW-Xinyi";
  for (i=0; i< sessionResult.length; i++){

    // 處理日期和時間
    sessionResult[i][1] = sessionResult[i][0].substr(11,5)+'~'+sessionResult[i][1].substr(11,5);
    sessionResult[i][0] = sessionResult[i][0].substr(0,10);

    // 合約時間_月 
    sessionResult[i][8] = courseSettings[sessionResult[i][7]];

    // 合約簽訂日期，Database ContractForms 裡的 ProcessTime
    sessionResult[i][9] = sessionResult[i][9].substr(0,10);

    // 合約開始日期，Database ContractForms 裡的 CourseSessionFirstStartDate           
    sessionResult[i][10] = sessionResult[i][10].substr(0,10);

    // 處理 合約到期日期
      // 合約到期日期，Database ContractForms 裡的 ExpirationDate 
      sessionResult[i][11] = sessionResult[i][11].substr(0,10);       

      // 合約延伸到期日期，Database ContractForms 裡的 ExpirationDate 
      sessionResult[i][31] = sessionResult[i][31].substr(0,10);   

      // 如果有延伸，結合兩個日期
      if (sessionResult[i][31] > "0001-01-01") {
        sessionResult[i][11] = sessionResult[i][11] + "<br>Ext. " + sessionResult[i][31];
      }


    // 處理 合約已進行(月)
    var startDate = new Date(sessionResult[i][9]);
    var endDate = new Date(sessionResult[i][0]);
    sessionResult[i][12] = Math.floor((endDate - startDate)/(864000*30))/100;

    // 處理 合約總價(未稅)
    //sessionResult[i][13] = Math.floor(parseFloat(sessionResult[i][13])*100)/100;  

    // 處理 合約總價(未稅)
    sessionResult[i][14] = parseFloat(sessionResult[i][13])/1.05;  

    // 處理 合約已執行堂數                
    var sessionDateTime = sessionResult[i][0]+ " " + sessionResult[i][1];
    //if (contractSessionHistory[sessionResult[i][4]].length >0){
    //  console.log(contractSessionHistory[sessionResult[i][4]].indexOf(sessionDateTime)+1);
    //}

    sessionResult[i][19] =contractSessionHistory[sessionResult[i][5]].indexOf(sessionDateTime)+1;

    // 處理 開始後來店頻率，因為會用到 sessionResult[i][18]，所以才放在之後，
    var usedMonth = (sessionResult[i][12] == 0)?1:sessionResult[i][12];
    sessionResult[i][16] = parseFloat(sessionResult[i][19])/usedMonth;


    // 處理 合約剩餘堂數                
    sessionResult[i][21] = sessionResult[i][18] - sessionResult[i][19];


    // 處理 課程單價(含稅)               
    sessionResult[i][22] = parseFloat(sessionResult[i][13])/parseFloat(sessionResult[i][18]);                 

    // 處理 課程單價(未稅)              
    sessionResult[i][23] = parseFloat(sessionResult[i][14])/parseFloat(sessionResult[i][18]);                

    // 合約退會堂數, 退費金額/課程單價(含稅)
    sessionResult[i][20] = sessionResult[i][20]/sessionResult[i][22];               


    // 處理 合約已認列金額(含稅)
    sessionResult[i][24] = (sessionResult[i][19] * parseFloat(sessionResult[i][13])) / 
                                 parseFloat(sessionResult[i][18]);

    // 處理 合約已認列金額(未稅)
    sessionResult[i][25] = sessionResult[i][24] / 1.05;

    // 處理 合約未認列金額(含稅)
    sessionResult[i][26] = sessionResult[i][13] - sessionResult[i][24];

    // 處理 合約未認列金額(未稅)
    sessionResult[i][27] = sessionResult[i][14] - sessionResult[i][25];                
    if ( sessionResult[i][2] != storeId) {
      console.log("store change");
      storeId = sessionResult[i][2];
      currentDate = "0000-00-00";
    }

    if (sessionResult[i][0] > currentDate) {
      //console.log("new day");
      currentDate = sessionResult[i][0];
      sessionIndexForDay = 1;
      sessionResult[i][17] = sessionIndexForDay++; 
      // 當日認列金額(含稅)
      sessionResult[i][28] = sessionResult[i][22];


    } else {
      // 堂數排序 not implement yet
      sessionResult[i][17] = sessionIndexForDay++; 
      sessionResult[i][28] = sessionResult[i][22]+sessionResult[i-1][28];
    }

    // 當日認列金額(未稅)
    sessionResult[i][29] = sessionResult[i][28]/1.05;  

  }

  sessionDataTable.clear();
  sessionDataTable.rows.add(sessionResult).draw();
  $.loading.end();                    
}

function sessionCheck(){

  var startDateStr = $("#sessionQueryStartDate").val();
  var endDateStr = $("#sessionQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=03" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr; // API=03 為只搜尋單一合約的 sessions

  //console.log(apiUrl);

  $.loading.start($("#ml-讀取資料").text());
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      //returnFromAPI = JSON.parse(JSON.stringify(returnData));
      //console.log(returnFromAPI[0][3]);

      //sessionResult = JSON.parse(JSON.stringify(returnData));
      var sessionResultRaw = JSON.parse(JSON.stringify(returnData));
      console.log(sessionResultRaw);
      sessionResult=[];
      for (var i=0; i< sessionResultRaw.length; i++){
        if (sessionResultRaw[i][30]==true) { // RSV.[Check]
          sessionResult.push(sessionResultRaw[i]);
        }
      }
      processContractSessionHistory();
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}        

// used in the following admissionFeeCheck()       
async function processAdmissionFee() {

  var apiUrl;

  var courseKeys = Object.keys(courseSettings);
  if (courseKeys.length==0){
    $.loading.end();
    $.loading.start($("#ml-讀取課程設定").text());
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
                
  for (var i=0; i < admissionFeeResult.length; i++) {
   // 處理日期和時間，這裡存的是 GMT+0，必須特別處理。其他日期是 GMT+8
    var localDateTime = new Date(admissionFeeResult[i][0]);
    var localDate = localDateTime.toLocaleDateString().replace(/\//g,"-");
    var localTime = localDateTime.toLocaleTimeString();
    
    admissionFeeResult[i][0] = localDate;    
    admissionFeeResult[i][1] = localTime;    

    // 合約時間_月 
    admissionFeeResult[i][8] = courseSettings[admissionFeeResult[i][7]];

    // 合約簽訂日期，Database ContractForms 裡的 ProcessTime
    admissionFeeResult[i][9] = admissionFeeResult[i][9].substr(0,10);   

    // 已認列入會費(未稅)
    admissionFeeResult[i][11] = admissionFeeResult[i][10]/1.05;    

    // 發票種類
    if (admissionFeeResult[i][12]!=null) {
      if (admissionFeeResult[i][12].includes("Duplicate")) admissionFeeResult[i][12] = "二聯式發票";
      if (admissionFeeResult[i][12].includes("Triplicate")) admissionFeeResult[i][12] = "三聯式發票";
    }

    // 發票發行日期
    admissionFeeResult[i][13] = admissionFeeResult[i][13].substr(0,10);              
    if (admissionFeeResult[i][13]=='0001-01-01') admissionFeeResult[i][13] = "";



  }

  admissionFeeDataTable.clear();
  admissionFeeDataTable.rows.add(admissionFeeResult).draw(); 
  $.loading.end();          

}

function admissionFeeCheck(){

  var startDateStr = $("#admissionFeeQueryStartDate").val();
  var endDateStr = $("#admissionFeeQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=06" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr; // API=03 為只搜尋單一合約的 sessions

  //console.log(apiUrl);

  $.loading.start($("#ml-讀取資料").text());
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      var admissionFeeResultRaw = JSON.parse(JSON.stringify(returnData));
      console.log(admissionFeeResultRaw);
      admissionFeeResult=[];
      for (var i=0; i< admissionFeeResultRaw.length; i++){
          admissionFeeResult.push(admissionFeeResultRaw[i]);
      }

      processAdmissionFee();              
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}        

function productCheck(){

  var startDateStr = $("#productQueryStartDate").val();
  var endDateStr = $("#productQueryEndDate").val();

  console.log(startDateStr, endDateStr);

  var apiUrl = apiUrlBase + "?API=07" + "&StartDate=" + startDateStr +"&EndDate=" + endDateStr; // API=07 搜尋已銷售的 product

  //console.log(apiUrl);

  $.loading.start($("#ml-讀取資料").text());
  $.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function(returnData) {
      var productResultRaw = JSON.parse(JSON.stringify(returnData));
      console.log(productResultRaw);
      productResult=[];
      for (var i=0; i< productResultRaw.length; i++){
          productResult.push(productResultRaw[i]);
      }
      
      for (var i=0; i< productResult.length; i++) {
        // 處理日期
        productResult[i][0] = productResult[i][0].substr(0,10);     
        
        productResult[i][8] =  productResult[i][7]/1.05;          // 處理產品單價(未稅)
        
        productResult[i][10] =  productResult[i][7] *  productResult[i][9]; // 處理小計(含稅)
        productResult[i][11] =  productResult[i][8] *  productResult[i][9]; // 處理小計(未稅)
        
        
        productResult[i][13] = productResult[i][12]/1.05;         // 處理合約總價(未稅)
        productResult[i][14] = productResult[i][14].substr(0,10); // 處理付款日         
        productResult[i][16] = productResult[i][15]/1.05;         // 處理付款金額(未稅)  
     
        // 付款方式
        if (productResult[i][17]!=null) {
          if (productResult[i][17].includes("CreditCard")) productResult[i][17] = $("#ml-信用卡").text();
          if (productResult[i][17].includes("Cash")) productResult[i][17] = $("#ml-現金").text();
          if (productResult[i][17].includes("NoCardInstallment")) productResult[i][17] = $("#ml-無卡分期").text();
        }        
        
        // 發票種類
        if (productResult[i][18]!=null) {
          if (productResult[i][18].includes("Duplicate")) productResult[i][18] = "二聯式發票";
          if (productResult[i][18].includes("Triplicate")) productResult[i][18] = "三聯式發票";
        }

        // 發票發行日期
        productResult[i][19] = productResult[i][19].substr(0,10);              
        if (productResult[i][19]=='0001-01-01') productResult[i][19] = "";        
      }
      
      productDataTable.clear();
      productDataTable.rows.add(productResult).draw();       
      $.loading.end();
    },

    error: function() {
      alert("Database READ ERROR!!!");
    }
  });             
}