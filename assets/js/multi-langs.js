var multiLangsTable = {
"檢查課程預約狀況_en":" Check Session Reservations",
"檢查課程預約狀況_zh":" 檢查課程預約狀況 ",
"檢查課程預約狀況_cn":" 检查课程预约状况",
"檢查課程預約狀況_jp":" コース予約の状況を確認する",
"開始日期_en":" Start Date",
"開始日期_zh":" 開始日期",
"開始日期_cn":" 开始日期",
"開始日期_jp":" 開始日",
"結束日期_en":" End Date",
"結束日期_zh":" 結束日期",
"結束日期_cn":" 结束日期",
"結束日期_jp":" 終了日",
"檢查_en":" Check",
"檢查_zh":" 檢查 ",
"檢查_cn":" 检查",
"檢查_jp":" 確認する",
"匯出CSV_en":" Export CSV",
"匯出CSV_zh":" 匯出 CSV",
"匯出CSV_cn":" 汇出 CSV",
"匯出CSV_jp":" CSV 書き出す",
"匯出EXCEL_en":" ExportEXCEL",
"匯出EXCEL_zh":" 匯出EXCEL",
"匯出EXCEL_cn":" 汇出EXCEL",
"匯出EXCEL_jp":" EXCEL 書き出す",
"店鋪名稱_en":" Store Name",
"店鋪名稱_zh":" 店鋪名稱",
"店鋪名稱_cn":" 店铺名称",
"店鋪名稱_jp":" お店名",
"客戶名字_en":" Customer Name",
"客戶名字_zh":" 客戶名字",
"客戶名字_cn":" 客户名字",
"客戶名字_jp":" 顧客名",
"合約編號_en":" Contract Number",
"合約編號_zh":" 合約編號",
"合約編號_cn":" 合约编号",
"合約編號_jp":" 契約番号",
"預約日期_en":" Resevation Date",
"預約日期_zh":" 預約日期",
"預約日期_cn":" 预约日期",
"預約日期_jp":" 予約日",
"預約時間_en":" Resevation Time",
"預約時間_zh":" 預約時間",
"預約時間_cn":" 预约时间",
"預約時間_jp":" 予定",
"負責教練_en":" Coach",
"負責教練_zh":" 負責教練",
"負責教練_cn":" 负责教练",
"負責教練_jp":" コーチ",
"是否完成_en":" Finish Session",
"是否完成_zh":" 是否完成",
"是否完成_cn":" 是否完成",
"是否完成_jp":" セッションを終了する",
"備註說明_en":" Remark",
"備註說明_zh":" 備註說明",
"備註說明_cn":" 备注说明",
"備註說明_jp":" 備考",
}

if (localStorage.getItem("lang")!=null) setLang(localStorage.getItem("lang"));

function setLang(lang){
  //console.log(lang);
//  $("#langSelection").text(lang);
//  localStorage.setItem("lang", lang);

//  var langStr="en";
//  switch (lang) {
//    case 'English':
//      $("#langFlag").attr("src", "assets/img/flags/us.png");
//      langStr = "en";
//      break;
//    case 'French':
//      $("#langFlag").attr("src", "assets/img/flags/fr.png");
//      langStr = "fr";
//      break;
//    case 'Spanish':
//      $("#langFlag").attr("src", "assets/img/flags/es.png");
//      langStr = "es";
//      break;
//    case 'German':
//      $("#langFlag").attr("src", "assets/img/flags/de.png");
//      langStr = "de";
//      break; 
//    case '繁中':
//      $("#langFlag").attr("src", "assets/img/flags/tw.png");
//      langStr = "tw";
//      break;       
//  }

  var langStr = lang;
  $("[id*='ml-']").each(function(id,element) {
    //console.log(element.id, element.innerHTML);
    var idArr = element.id.split('-');
    console.log(idArr[1]+"_"+langStr, multiLangsTable[idArr[1]+"_"+langStr]);
    $("#ml-"+idArr[1]).text(multiLangsTable[idArr[1]+"_"+langStr]);
  });
}