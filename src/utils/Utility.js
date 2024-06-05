const BS = require("bikram-sambat-js");

export const englishToNepali = (number) => {
  let englishNumbers = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "-",
    "/",
    ":",
    "+",
    ".",
    ",",
  ];
  let nepaliNumbers = [
    "०",
    "१",
    "२",
    "३",
    "४",
    "५",
    "६",
    "७",
    "८",
    "९",
    "-",
    "/",
    ":",
    "+ ",
    ". ",
    ", ",
  ];
  const numberToConvert = number?.toString()?.split("");
  var result = "";
  for (var i = 0; i < numberToConvert?.length; i++) {
    for (var j = 0; j < englishNumbers?.length; j++) {
      if (numberToConvert[i] === englishNumbers[j]) {
        result += nepaliNumbers[j];
      }
    }
  }
  return result;
};

export const daysWeakToNepaliDaysWeak = (weekDays) => {
  let englishWeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let nepaliWeekDays = ["आ", "सो", "मं", "बु", "बि", "शु", "श"];
  const indexValue = englishWeekDays.indexOf(weekDays);
  return nepaliWeekDays[indexValue];
};

export const TimeSpanTimeOnly = (data) => {
  if (!data) {
    return "";
  }
  const splitData = data.split(".");
  const timeSpanOnly = splitData[0];
  const finalSplitData = timeSpanOnly.split(":");
  const finalData = `${finalSplitData[0]}:${finalSplitData[1]}`;
  return finalData;
};

export const BsDate = (englishDate) => {
  const aa = BS.ADToBS(englishDate);
  return aa;
};


const Num_To_Word = ["शुन्य","एक","दुई","तिन","चार","पांच","छ","सात", "आठ","नैा","दस",
"एघार","बार्ह","तेर्ह","चैाध","पन्ध्र","सोर्ह","सत्र","आठार","उन्नाइस","बिस",
"एक्काइस","बाइस","तेइस","चैाबिस","पच्चिस","छब्बिस","सत्ताइस","अठ्ठाईस","उनान्तिस","तिस","एकतिस","बत्तिस",
"तेत्तिस","चौतिस","पैतिस","छत्तिस","सइतिस","अड्तिस","उन्चालिस","चालिस","एकचालिस","बयालिस","त्रिचालिस","चौवालिस",
"पैतालिस","छयालिस","सच्चालिस","अड्चालिस","उन्पचास","पचास","एकाउन्न","बाउन्न","त्रिपन्न","चौवन्न","पचपन्न","छपन्न",
"सन्ताउन्न","अनठाउन्न","उन्ननसाठी","साठी","एकसठ्ठी","वैसठ्ठी","त्रीसठ्ठी","चौसठ्ठी","पैसठ्ठी","छैसठ्ठी","सड्सठ्ठी","अड्सठ्ठी","उनन्सत्तरी","सत्तरी",
"एकत्तर","बहत्तर","त्रिहत्तर","चौहत्तर","पचत्तर","छयत्तर","सतत्तर","अठ्त्तर","उनासी","असि",
"एकासी","बयासी","त्रीयासी","चौरासी","पचासी","छयासी","सतासी","अठासी","उन्नब्बे","नब्बे",
"एकानब्बे","बयानब्बे","त्रियानब्बे","चौरानब्बे","पन्चानब्बे","छयानब्बे","सन्तानब्बे","अन्ठानब्बे","उनान्सय"];
const Num_Unit = [ "सय", "हजार", "लाख", "करोड", "अर्ब", "खर्ब", "शंख" ];
 
  function ConvertToNepali(paramNumber ) {
    const value = paramNumber.split('.');
    let rupeesFormat = ConvertToNepaliWord_Rupees(value[0]);
    let paisaFormat;
    if (value.length === 1) {
        paisaFormat = "मात्र";
        return rupeesFormat + paisaFormat;
    } else {
        paisaFormat = ConvertToNepali_Paisa(parseInt(value[1]));
        return rupeesFormat + paisaFormat + " पैसा मात्र ।";
    }
}

export function convertNumberToNepaliText(paramNumber ) {
  if (paramNumber !== "") {
      let value = paramNumber?.split('.');
      let rupeesFormat = ConvertToNepaliWord_Rupees(value[0]);
      let paisaFormat;
      if (value.length === 1) {
          paisaFormat = "मात्र";
          return rupeesFormat + paisaFormat;
      } else {
          paisaFormat = ConvertToNepali_Paisa(parseInt(value[1]));
          return rupeesFormat + paisaFormat + " पैसा मात्र ।";
      }
  } else {
      return "N/A";
  }
}

function ConvertToNepali_Paisa(paramNumber ) {
    return Num_To_Word[paramNumber];
}

function Common(ten_ , hun_ , thou_ , lakh_ , karod_ , araba_ ) {
    let ten = 0, hun = 0, thou = 0, lakh = 0, karod = 0;
    if (ten_ !== "") {
        ten = parseInt(ten_);
    }
    if (hun_ !== "") {
        hun = parseInt(hun_);
    }
    if (thou_ !== "") {
        thou = parseInt(thou_);
    }
    if (lakh_ !== "") {
        lakh = parseInt(lakh_);
    }
    if (karod_ !== "") {
        karod = parseInt(karod_);
    }
    let str_word = "";
    if (karod_ !== "" && karod !== 0) {
        if (lakh_ !== "" && lakh !== 0) {
            if (thou_ !== "" && thou !== 0) {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " +
               Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                Num_To_Word[thou] + " " + Num_Unit[1] + " "
                + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                  Num_To_Word[thou] + " " + Num_Unit[1] + " "
                  + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                            Num_To_Word[thou] + " " + Num_Unit[1] + " "
                            + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                Num_To_Word[thou] + " " + Num_Unit[1];
                    }
                }
            } else {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2] + " "
                 + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                 + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2] + " "
                   + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2] + " "
                  + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[lakh] + " " + Num_Unit[2];
                    }
                }
            }
        } else {
            if (thou_ !== "" && thou !== 0) {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "") {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[thou] + " " + Num_Unit[1] + " "
                  + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                  + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[thou] + " " + Num_Unit[1] + " "
                 + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[thou] + " " + Num_Unit[1] + " "
                  + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[thou] + " " + Num_Unit[1];
                    }
                }
            } else {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                  + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3] + " " + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[karod] + " " + Num_Unit[3];
                    }
                }
            }
        }
    } else {
        if (lakh_ !== "" && lakh !== 0) {
            if (thou_ !== "" && thou !== 0) {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                Num_To_Word[thou] + " " + Num_Unit[1] + " "
                + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                Num_To_Word[thou] + " " + Num_Unit[1] + " "
                + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                Num_To_Word[thou] + " " + Num_Unit[1] + " "
                + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " " +
                Num_To_Word[thou] + " " + Num_Unit[1];
                    }
                }
            } else {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " "
                  + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                  + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " "
                   + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2] + " "
                  + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[lakh] + " " + Num_Unit[2];
                    }
                }
            }
        } else {
            if (thou_ !== "" && thou !== 0) {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[thou] + " " + Num_Unit[1] + " "
                 + Num_To_Word[hun] + " " + Num_Unit[0] + " "
                 + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[thou] + " " + Num_Unit[1] + " "
                   + Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[thou] + " " + Num_Unit[1] + " "
                 + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[thou] + " " + Num_Unit[1];
                    }
                }
            } else {
                if (hun_ !== "" && hun !== 0) {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[hun] + " " + Num_Unit[0] + " "
                 + Num_To_Word[ten];
                    } else {
                        str_word = Num_To_Word[hun] + " " + Num_Unit[0];
                    }
                } else {
                    if (ten_ !== "" && ten !== 0) {
                        str_word = Num_To_Word[ten];
                    } else {
                        str_word = "";
                    }
                }
            }
        }
    }
    return str_word;
}

function ConvertToNepaliWord_Rupees(paramNumber ) {
  let dec_word = paramNumber.toString();
  let str_word = "";
  let str_word_pre = "";
  let str_word_post = " रुपैंया ";
  let sOne, sTen, sHun, sThou, sLakh, sKarod;
  if (dec_word.length == 1) {
      str_word = Num_To_Word[parseInt(paramNumber)];
  } else if (dec_word.length == 2) {
      str_word = Num_To_Word[parseInt(paramNumber)];
  } else if (dec_word.length == 3) {
      sTen = dec_word.substring(0, 1);
      sOne = dec_word.substring(1, 2);
      let ten = parseInt(sTen);
      let one = parseInt(sOne);
      if (one != 0) {
          str_word = str_word = Common(sTen, "", "", "", "", "") + " " + Num_Unit[0] + " " + Num_To_Word[one];
      } else {
          str_word = str_word = Common(sTen, "", "", "", "", "") + " " + Num_Unit[0];
      }
  } else if (dec_word.length == 4) {
      sThou = dec_word.substring(0, 1);
      sHun = dec_word.substring(1, 2);
      sTen = dec_word.substring(2, 4);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Common(sTen, sHun, sThou, "", "", "");
  } else if (dec_word.length == 5) {
      sThou = dec_word.substring(0, 2);
      sHun = dec_word.substring(2, 3);
      sTen = dec_word.substring(3, 5);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Common(sTen, sHun, sThou, "", "", "");
  } else if (dec_word.length == 6) {
      sLakh = dec_word.substring(0, 1);
      sThou = dec_word.substring(1, 3);
      sHun = dec_word.substring(3, 4);
      sTen = dec_word.substring(4, 6);
      let lakh = parseInt(sLakh);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Common(sTen, sHun, sThou, sLakh, "", "");
  } else if (dec_word.length == 7) {
      sLakh = dec_word.substring(0, 2);
      sThou = dec_word.substring(2, 4);
      sHun = dec_word.substring(4, 5);
      sTen = dec_word.substring(5, 7);
      let lakh = parseInt(sLakh);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Common(sTen, sHun, sThou, sLakh, "", "");
  } else if (dec_word.length == 8) {
      sKarod = dec_word.substring(0, 1);
      sLakh = dec_word.substring(1, 3);
      sThou = dec_word.substring(3, 5);
      sHun = dec_word.substring(5, 6);
      sTen = dec_word.substring(6, 8);
      let karod = parseInt(sKarod);
      let lakh = parseInt(sLakh);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Num_To_Word[karod] + " ‌‌‌‌‌‌‌‌‌‌" + Num_Unit[3] + " " +
          Common(sTen, sHun, sThou, sLakh, "", "");
  } else if (dec_word.length == 9) {
      sKarod = dec_word.substring(0, 2);
      sLakh = dec_word.substring(2, 4);
      sThou = dec_word.substring(4, 6);
      sHun = dec_word.substring(6, 7);
      sTen = dec_word.substring(7, 9);
      let karod = parseInt(sKarod);
      let lakh = parseInt(sLakh);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Common(sTen, sHun, sThou, sLakh, sKarod, "");
  } else if (dec_word.length == 10) {
      sKarod = dec_word.substring(1, 3);
      sLakh = dec_word.substring(3, 5);
      sThou = dec_word.substring(5, 7);
      sHun = dec_word.substring(7, 8);
      sTen = dec_word.substring(8, 10);
      let arba = parseInt(dec_word.substring(0, 1));
      let karod = parseInt(sKarod);
      let lakh = parseInt(sLakh);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Num_To_Word[arba] + " ‌‌‌‌‌‌‌‌‌‌" + Num_Unit[4] + " " +
          Common(sTen, sHun, sThou, sLakh, sKarod, "");
  } else if (dec_word.length == 11) {
      sKarod = dec_word.substring(2, 4);
      sLakh = dec_word.substring(4, 6);
      sThou = dec_word.substring(6, 8);
      sHun = dec_word.substring(8, 9);
      sTen = dec_word.substring(9, 11);
      let arba = parseInt(dec_word.substring(0, 2));
      let karod = parseInt(sKarod);
      let lakh = parseInt(sLakh);
      let thou = parseInt(sThou);
      let hun = parseInt(sHun);
      let ten = parseInt(sTen);
      str_word = Num_To_Word[arba] + " ‌‌‌‌‌‌‌‌‌‌" + Num_Unit[4] + " " +
          Common(sTen, sHun, sThou, sLakh, sKarod, "");
  } else {
      // let size_of_arr = parseInt(paramNumber.toString().length) / 2 - 3);
      // let nums = new Array(size_of_arr);
      str_word = Num_To_Word[parseInt(paramNumber)];
  }
  return str_word_pre + str_word + str_word_post;
}
