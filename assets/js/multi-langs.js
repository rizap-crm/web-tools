var multiLangsTable = {
  "TotalLead_en": "Total Lead",
  "TotalLead_fr": "Plomb total",
  "TotalLead_es": "Plomo total",  
  "TotalLead_de": "Gesamtblei",   
  
  "ProductsYearlySales_en": "Products Yearly Sales",
  "ProductsYearlySales_fr": "Ventes annuelles de produits",
  "ProductsYearlySales_es": "Productos Ventas anuales",
  "ProductsYearlySales_de": "Produkte Jahresumsatz",
  
  "SalesOverview_en": "Sales Overview",
  "SalesOverview_fr": "Aperçu des ventes",
  "SalesOverview_es": "Resumen de ventas",
  "SalesOverview_de": "Verkaufsübersicht",
  
  "TotalSales_en": "Total Sales",
  "TotalSales_fr": "Ventes totales",
  "TotalSales_es": "Ventas totales",
  "TotalSales_de": "Gesamtumsatz",
  
  "YearlyProjects_en": "Yearly Projects",
  "YearlyProjects_fr": "Projets annuels",
  "YearlyProjects_es": "Proyectos anuales",
  "YearlyProjects_de": "Jährliche Projekte",
  
  "TotalRevenue_en": "Total Revenue",
  "TotalRevenue_fr": "Revenu total",
  "TotalRevenue_es": "Los ingresos totales",
  "TotalRevenue_de": "Gesamtumsatz",
  
  "SalesStatistics_en": "Sales Statistics",
  "SalesStatistics_fr": "Statistiques de ventes",
  "SalesStatistics_es": "Estadísticas de ventas",
  "SalesStatistics_de": "Verkaufsstatistik",
  
  "CompletedTasks_en": "Completed Tasks",
  "CompletedTasks_fr": "Tâches terminées",
  "CompletedTasks_es": "Tareas completadas",
  "CompletedTasks_de": "Abgeschlossene Aufgaben",
  "CompletedTasks_tw": "完成任務",  
  
  "ContentContacts_en": "Contacts",
  "ContentContacts_fr": "Contacts",
  "ContentContacts_es": "Contactos",
  "ContentContacts_de": "Kontakte", 
  "ContentContacts_tw": "聯絡資訊",   
  
  "SidebarTasks_en": "Tasks",
  "SidebarTasks_fr": "Tâches",
  "SidebarTasks_es": "Tareas",
  "SidebarTasks_de": "Aufgaben",  
  "SidebarTasks_tw": "任務",    
  
  "SidebarContacts_en": "Contacts",
  "SidebarContacts_fr": "Contacts",
  "SidebarContacts_es": "Contactos",
  "SidebarContacts_de": "Kontakte",  
  "SidebarContacts_tw": "聯絡資訊",    
  
  
}

if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));

function setLang(lang){
  //console.log(lang);
  $("#langSelection").text(lang);
  localStorage.setItem("lang", lang);

  var langStr="en";
  switch (lang) {
    case 'English':
      $("#langFlag").attr("src", "assets/img/flags/us.png");
      langStr = "en";
      break;
    case 'French':
      $("#langFlag").attr("src", "assets/img/flags/fr.png");
      langStr = "fr";
      break;
    case 'Spanish':
      $("#langFlag").attr("src", "assets/img/flags/es.png");
      langStr = "es";
      break;
    case 'German':
      $("#langFlag").attr("src", "assets/img/flags/de.png");
      langStr = "de";
      break; 
    case '繁中':
      $("#langFlag").attr("src", "assets/img/flags/tw.png");
      langStr = "tw";
      break;       
  }

  $("[id*='ml-']").each(function(id,element) {
    //console.log(element.id, element.innerHTML);
    var idArr = element.id.split('-');
    console.log(idArr[1]+langStr+"_", multiLangsTable[idArr[1]+"_"+langStr]);
    $("#ml-"+idArr[1]).text(multiLangsTable[idArr[1]+"_"+langStr]);
  });
}